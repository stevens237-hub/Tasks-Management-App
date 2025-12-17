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
        const { title, stage, date, priority, assets } = req.body;

        // Validation de base
        if (!title || title.trim() === '') {
            return res.status(400).json({ 
                status: false, 
                message: "Title is required" 
            });
        }

        // Validation des enums
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

        // Préparer les données de la tâche
        const task = {
            title,
            stage: stage ? stage.toLowerCase() : 'todo',
            date: date ? new Date(date) : new Date(),
            priority: priority ? priority.toLowerCase() : 'normal',
            assets: assets || [],
            activities: [{
                type: "started",
                activity: `Task created with ${priority || 'normal'} priority`,
                date: new Date(),
                by: new ObjectId(req.user._id)
            }],
            subTasks: [],
            team: [],
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
        const { stage, isTrashed } = req.query;

        // Construire la requête
        let query = { isTrashed: isTrashed === 'true' };

        if (stage) {
            query.stage = stage.toLowerCase();
        }

        // Récupérer les tâches
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
        const { title, date, stage, priority, assets } = req.body;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({
                status: false,
                message: 'Invalid task ID'
            });
        }

        // Préparer les données de mise à jour
        const updateData = {
            updatedAt: new Date()
        };

        if (title) updateData.title = title;
        if (date) updateData.date = new Date(date);
        if (priority) updateData.priority = priority.toLowerCase();
        if (assets) updateData.assets = assets;
        if (stage) updateData.stage = stage.toLowerCase();

        const result = await db.collection('tasks').findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: updateData },
            { returnDocument: 'after' }
        );

        if (!result.value) {
            return res.status(404).json({
                status: false,
                message: 'Task not found'
            });
        }

        res.status(200).json({ 
            status: true, 
            task: result.value,
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

        // Actions en masse (sans ID)
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

        // Actions sur une tâche spécifique (avec ID)
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

/**
 * Créer une sous-tâche
 * @route   PUT /api/tasks/create-subtask/:id
 * @access  Private
 */
// const createSubTask = async (req, res) => {
//     try {
//         const db = getDB();
//         const { id } = req.params;
//         const { title, tag, date } = req.body;

//         if (!title) {
//             return res.status(400).json({
//                 status: false,
//                 message: 'SubTask title is required'
//             });
//         }

//         if (!ObjectId.isValid(id)) {
//             return res.status(400).json({
//                 status: false,
//                 message: 'Invalid task ID'
//             });
//         }

//         const newSubTask = {
//             _id: new ObjectId(),
//             title,
//             date: date ? new Date(date) : new Date(),
//             tag: tag || '',
//             completed: false
//         };

//         const result = await db.collection('tasks').findOneAndUpdate(
//             { _id: new ObjectId(id) },
//             { 
//                 $push: { subTasks: newSubTask },
//                 $set: { updatedAt: new Date() }
//             },
//             { returnDocument: 'after' }
//         );

//         if (!result.value) {
//             return res.status(404).json({
//                 status: false,
//                 message: 'Task not found'
//             });
//         }

//         res.status(200).json({ 
//             status: true, 
//             message: "SubTask added successfully",
//             task: result.value
//         });
//     } catch (error) {
//         console.error('Create subtask error:', error);
//         return res.status(400).json({ 
//             status: false, 
//             message: error.message 
//         });
//     }
// };

/**
 * Ajouter une activité à une tâche
 * @route   POST /api/tasks/activity/:id
 * @access  Private
 */
// const postTaskActivity = async (req, res) => {
//     try {
//         const db = getDB();
//         const { id } = req.params;
//         const { type, activity } = req.body;

//         // Validation du type d'activité
//         const validActivityTypes = ['assigned', 'started', 'in progress', 'bug', 'completed', 'commented'];
//         const activityType = type ? type.toLowerCase() : 'commented';

//         if (!validActivityTypes.includes(activityType)) {
//             return res.status(400).json({
//                 status: false,
//                 message: `Activity type must be one of: ${validActivityTypes.join(', ')}`
//             });
//         }

//         if (!activity) {
//             return res.status(400).json({
//                 status: false,
//                 message: 'Activity text is required'
//             });
//         }

//         if (!ObjectId.isValid(id)) {
//             return res.status(400).json({
//                 status: false,
//                 message: 'Invalid task ID'
//             });
//         }

//         const newActivity = {
//             type: type || 'commented',
//             activity,
//             date: new Date(),
//             by: new ObjectId(req.user._id)
//         };

//         const result = await db.collection('tasks').findOneAndUpdate(
//             { _id: new ObjectId(id) },
//             { 
//                 $push: { activities: newActivity },
//                 $set: { updatedAt: new Date() }
//             },
//             { returnDocument: 'after' }
//         );

//         if (!result.value) {
//             return res.status(404).json({
//                 status: false,
//                 message: 'Task not found'
//             });
//         }

//         res.status(200).json({
//             status: true,
//             message: 'Activity posted successfully',
//             task: result.value
//         });
//     } catch (error) {
//         console.error('Post activity error:', error);
//         return res.status(400).json({ 
//             status: false, 
//             message: error.message 
//         });
//     }
// };

module.exports = {
    createTask,
    getTasks,
    getTask,
    updateTask,
    trashTask,
    deleteRestoreTask,
};