const { ObjectId } = require('mongodb');
const { getDB } = require('../config/database');

/**
 * Créer une nouvelle tâche
 * @route   POST /api/tasks/create
 * @access  Private
 */
const createTask = async (req, res) => {
    try {
        const db = getDB();
        const { title, stage, date, priority, assets, description, links, team } = req.body;

        if (!title || title.trim() === '') {
            return res.status(400).json({ 
                status: false, 
                message: "Title is required" 
            });
        }

        const validPriorities = ['high', 'medium', 'normal', 'low'];
        const validStages = ['todo', 'in progress', 'completed'];

        if (priority && !validPriorities.includes(priority.toLowerCase())) {
            return res.status(400).json({ 
                status: false, 
                message: `Priority must be one of: ${validPriorities.join(', ')}`
            });
        }

        if (stage && !validStages.includes(stage.toLowerCase())) {
            return res.status(400).json({ 
                status: false, 
                message: `Stage must be one of: ${validStages.join(', ')}`
            });
        }

        const task = {
            title,
            stage: stage ? stage.toLowerCase() : 'todo',
            date: date ? new Date(date) : new Date(),
            priority: priority ? priority.toLowerCase() : 'normal',
            description: description || "",
            links: links || "",
            assets: assets || [],
            team: team || [],
            activities: [{
                type: "started",
                activity: `Task created with ${priority || 'normal'} priority`,
                date: new Date(),
                by: req.user._id
            }],
            subTasks: [],
            userId: req.user._id,
            isTrashed: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await db.collection('tasks').insertOne(task);

        res.status(201).json({ 
            status: true, 
            task: { ...task, _id: result.insertedId }, 
            message: "Task created successfully" 
        });
    } catch (error) {
        console.error('Create task error:', error);
        return res.status(400).json({ 
            status: false, 
            message: error.message 
        });
    }
};

/**
 * Récupérer toutes les tâches (avec filtres optionnels)
 * @route   GET /api/tasks
 * @access  Private
 */
const getTasks = async (req, res) => {
    try {
        const db = getDB();
        const { stage, isTrashed, search } = req.query;

        let query = { 
            userId: req.user._id,
            isTrashed: isTrashed === 'true' 
        };

        if (stage && stage !== '') {
            query.stage = stage.toLowerCase();
        }

        if (search && search !== '') {
            query.title = { $regex: search, $options: 'i' };
        }

        const tasks = await db.collection('tasks')
            .find(query)
            .sort({ createdAt: -1 })
            .toArray();

        res.status(200).json({
            status: true,
            tasks,
        });
    } catch (error) {
        console.error('Get tasks error:', error);
        return res.status(400).json({ 
            status: false, 
            message: error.message 
        });
    }
};

/**
 * Récupérer une tâche par ID
 * @route   GET /api/tasks/:id
 * @access  Private
 */
const getTask = async (req, res) => {
    try {
        const db = getDB();
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: 'Invalid task ID'
            });
        }

        const task = await db.collection('tasks').findOne({ _id: new ObjectId(id) });

        if (!task) {
            return res.status(404).json({
                status: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({
            status: true,
            task,
        });
    } catch (error) {
        console.error('Get task error:', error);
        return res.status(400).json({ 
            status: false, 
            message: error.message 
        });
    }
};

/**
 * Mettre à jour une tâche
 * @route   PUT /api/tasks/update/:id
 * @access  Private
 */
const updateTask = async (req, res) => {
    try {
        const db = getDB();
        const { id } = req.params;
        const { title, date, stage, priority, assets, description, links, team } = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: 'Invalid task ID'
            });
        }

        const updateData = {
            updatedAt: new Date()
        };

        if (title) updateData.title = title;
        if (date) updateData.date = new Date(date);
        if (priority) updateData.priority = priority.toLowerCase();
        if (stage) updateData.stage = stage.toLowerCase();
        if (description !== undefined) updateData.description = description;
        if (links !== undefined) updateData.links = links;
        if (assets) updateData.assets = assets;
        if (team) updateData.team = team;

        const existingTask = await db.collection('tasks').findOne({ _id: new ObjectId(id) });

        if (!existingTask) {
            return res.status(404).json({
                status: false,
                message: 'Task not found'
            });
        }

        if (!existingTask.userId) {
            updateData.userId = req.user._id;
        }

        const result = await db.collection('tasks').findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: updateData },
            { returnDocument: 'after' }
        );

        res.status(200).json({ 
            status: true, 
            task: result,
            message: "Task updated successfully" 
        });
    } catch (error) {
        console.error('Update task error:', error);
        return res.status(400).json({ 
            status: false, 
            message: error.message 
        });
    }
};

/**
 * Déplacer une tâche vers la corbeille
 * @route   PUT /api/tasks/trash/:id
 * @access  Private
 */
const trashTask = async (req, res) => {
    try {
        const db = getDB();
        const { id } = req.params;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: 'Invalid task ID'
            });
        }

        const result = await db.collection('tasks').updateOne(
            { _id: new ObjectId(id) },
            { $set: { isTrashed: true, updatedAt: new Date() }}
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                status: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({
            status: true,
            message: 'Task moved to trash successfully',
        });
    } catch (error) {
        console.error('Trash task error:', error);
        return res.status(400).json({ 
            status: false, 
            message: error.message 
        });
    }
};

/**
 * Supprimer ou restaurer une tâche
 * @route   DELETE /api/tasks/delete-restore/:id?actionType=delete|restore
 * @route   DELETE /api/tasks/delete-restore?actionType=deleteAll|restoreAll
 * @access  Private
 */
const deleteRestoreTask = async (req, res) => {
    try {
        const db = getDB();
        const { id } = req.params;
        const { actionType } = req.query;

        if (actionType === "deleteAll") {
            const result = await db.collection('tasks').deleteMany({ isTrashed: true });
            return res.status(200).json({
                status: true,
                message: `${result.deletedCount} tasks deleted permanently`,
            });
        } else if (actionType === "restoreAll") {
            const result = await db.collection('tasks').updateMany(
                { isTrashed: true },
                { $set: { isTrashed: false, updatedAt: new Date() }}
            );
            return res.status(200).json({
                status: true,
                message: `${result.modifiedCount} tasks restored successfully`,
            });
        }

        if (!id) {
            return res.status(400).json({
                status: false,
                message: 'Task ID is required for delete and restore actions'
            });
        }

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: 'Invalid task ID'
            });
        }

        if (actionType === "delete") {
            const result = await db.collection('tasks').deleteOne({ _id: new ObjectId(id) });
            if (result.deletedCount === 0) {
                return res.status(404).json({
                    status: false,
                    message: 'Task not found'
                });
            }
            res.status(200).json({
                status: true,
                message: 'Task deleted permanently',
            });
        } else if (actionType === "restore") {
            const result = await db.collection('tasks').updateOne(
                { _id: new ObjectId(id) },
                { $set: { isTrashed: false, updatedAt: new Date() }}
            );
            if (result.matchedCount === 0) {
                return res.status(404).json({
                    status: false,
                    message: 'Task not found'
                });
            }
            res.status(200).json({
                status: true,
                message: 'Task restored successfully',
            });
        } else {
            return res.status(400).json({
                status: false,
                message: 'Invalid action type. Use: delete, restore, deleteAll, or restoreAll'
            });
        }
    } catch (error) {
        console.error('Delete/Restore task error:', error);
        return res.status(400).json({ 
            status: false, 
            message: error.message 
        });
    }
};

/** Récupérer les statistiques du tableau de bord
 * @route   GET /api/tasks/dashboard/stats
 * @access  Private
 */
const getDashboardStats = async (req, res) => {
    try {
        const db = getDB();
        
        const query = {
            userId: req.user._id,
            isTrashed: false
        };

        // Récupérer toutes les tâches de l'utilisateur
        const allTasks = await db.collection('tasks')
            .find(query)
            .sort({ _id: -1 })
            .toArray();

        // Calculer la date d'il y a 7 jours
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        // Compter les tâches par stage
        const groupedTasks = allTasks.reduce((result, task) => {
            const stage = task.stage;
            if (!result[stage]) {
                result[stage] = 1;
            } else {
                result[stage] += 1;
            }
            return result;
        }, {});

        // Compter les tâches créées cette semaine par stage
        const lastWeekTasks = allTasks.filter(task => 
            new Date(task.createdAt) >= oneWeekAgo
        );

        const lastWeekGrouped = lastWeekTasks.reduce((result, task) => {
            const stage = task.stage;
            if (!result[stage]) {
                result[stage] = 1;
            } else {
                result[stage] += 1;
            }
            return result;
        }, {});

        // Données pour le graphique (par priorité)
        const graphData = Object.entries(
            allTasks.reduce((result, task) => {
                const { priority } = task;
                result[priority] = (result[priority] || 0) + 1;
                return result;
            }, {})
        ).map(([name, total]) => ({ name, total }));

        // Total des tâches
        const totalTasks = allTasks.length;

        // Total des tâches de la semaine dernière
        const totalLastWeek = lastWeekTasks.length;

        // Les 10 dernières tâches
        const last10Task = allTasks.slice(0, 10);

        // Résumé
        const summary = {
            totalTasks,
            last10Task,
            tasks: groupedTasks,
            lastWeekTasks: lastWeekGrouped,
            totalLastWeek,
            graphData,
        };

        res.status(200).json({ 
            status: true, 
            ...summary, 
            message: "Successfully." 
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        return res.status(400).json({ 
            status: false, 
            message: error.message 
        });
    }
};

/** Créer une sous-tâche pour une tâche donnée
 * @route   POST /api/tasks/:id/subtasks
 * @access  Private
 */
const createSubTask = async (req, res) => {
    try {
        const db = getDB();
        const { title, tag, date } = req.body;
        const { id } = req.params;

        // Validation
        if (!title || title.trim() === '') {
            return res.status(400).json({
                status: false,
                message: 'SubTask title is required'
            });
        }

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: 'Invalid task ID'
            });
        }

        // Créer la nouvelle sous-tâche
        const newSubTask = {
            _id: new ObjectId(),
            title,
            date: date ? new Date(date) : new Date(),
            tag: tag || '',
            isCompleted: false
        };

        // Ajouter la sous-tâche au tableau subTasks
        const result = await db.collection('tasks').findOneAndUpdate(
            { _id: new ObjectId(id) },
            { 
                $push: { subTasks: newSubTask },
                $set: { updatedAt: new Date() }
            },
            { returnDocument: 'after' }
        );

        if (!result) {
            return res.status(404).json({
                status: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({ 
            status: true, 
            message: "SubTask added successfully.",
            task: result
        });
    } catch (error) {
        console.error('Create subtask error:', error);
        return res.status(400).json({ 
            status: false, 
            message: error.message 
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    trashTask,
    deleteRestoreTask,
    getDashboardStats,
    createSubTask,
};