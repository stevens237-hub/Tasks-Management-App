const { ObjectId } = require('mongodb');

/**
 * Task Helper Class
 * Fournit des méthodes statiques pour interagir avec la collection 'tasks'
 * Utilise le driver MongoDB natif (pas Mongoose)
 */
class Task {
    /**
     * Créer une nouvelle tâche
     * @param {Object} db - Instance de la base de données MongoDB
     * @param {Object} taskData - Données de la tâche
     * @returns {Object} - Tâche créée avec son _id
     */
    static async create(db, taskData) {
        const task = {
            title: taskData.title,
            date: taskData.date || new Date(),
            priority: taskData.priority || 'normal',
            stage: taskData.stage || 'todo',
            activities: taskData.activities || [],
            subTasks: taskData.subTasks || [],
            assets: taskData.assets || [],
            team: taskData.team || [],
            isTrashed: false,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await db.collection('tasks').insertOne(task);
        return { ...task, _id: result.insertedId };
    }

    /**
     * Trouver toutes les tâches avec filtres optionnels
     * @param {Object} db - Instance de la base de données MongoDB
     * @param {Object} query - Critères de recherche
     * @returns {Array} - Liste des tâches
     */
    static async find(db, query = {}) {
        return await db.collection('tasks')
            .find(query)
            .sort({ createdAt: -1 })
            .toArray();
    }

    /**
     * Trouver une tâche par ID
     * @param {Object} db - Instance de la base de données MongoDB
     * @param {string} id - ID de la tâche
     * @returns {Object|null} - Tâche trouvée ou null
     */
    static async findById(db, id) {
        if (!ObjectId.isValid(id)) {
            return null;
        }
        return await db.collection('tasks').findOne({ _id: new ObjectId(id) });
    }

    /**
     * Mettre à jour une tâche
     * @param {Object} db - Instance de la base de données MongoDB
     * @param {string} id - ID de la tâche
     * @param {Object} updateData - Données à mettre à jour
     * @returns {Object} - Résultat de la mise à jour
     */
    static async updateById(db, id, updateData) {
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid task ID');
        }

        const update = {
            ...updateData,
            updatedAt: new Date()
        };

        return await db.collection('tasks').findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: update },
            { returnDocument: 'after' }
        );
    }

    /**
     * Supprimer une tâche définitivement
     * @param {Object} db - Instance de la base de données MongoDB
     * @param {string} id - ID de la tâche
     * @returns {Object} - Résultat de la suppression
     */
    static async deleteById(db, id) {
        if (!ObjectId.isValid(id)) {
            throw new Error('Invalid task ID');
        }
        return await db.collection('tasks').deleteOne({ _id: new ObjectId(id) });
    }

    /**
     * Valider les données d'une tâche
     * @param {Object} taskData - Données à valider
     * @returns {Object} - { isValid: boolean, errors: array }
     */
    static validate(taskData) {
        const errors = [];
        const validPriorities = ['high', 'medium', 'normal', 'low'];
        const validStages = ['todo', 'in progress', 'completed'];

        if (!taskData.title || taskData.title.trim() === '') {
            errors.push('Title is required');
        }

        if (taskData.priority && !validPriorities.includes(taskData.priority.toLowerCase())) {
            errors.push(`Priority must be one of: ${validPriorities.join(', ')}`);
        }

        if (taskData.stage && !validStages.includes(taskData.stage.toLowerCase())) {
            errors.push(`Stage must be one of: ${validStages.join(', ')}`);
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * Ajouter une activité à une tâche
     * @param {Object} db - Instance de la base de données MongoDB
     * @param {string} taskId - ID de la tâche
     * @param {Object} activity - Activité à ajouter
     * @returns {Object} - Tâche mise à jour
     */
    static async addActivity(db, taskId, activity) {
        if (!ObjectId.isValid(taskId)) {
            throw new Error('Invalid task ID');
        }

        const newActivity = {
            type: activity.type || 'commented',
            activity: activity.activity,
            date: new Date(),
            by: activity.by ? new ObjectId(activity.by) : null
        };

        return await db.collection('tasks').findOneAndUpdate(
            { _id: new ObjectId(taskId) },
            { 
                $push: { activities: newActivity },
                $set: { updatedAt: new Date() }
            },
            { returnDocument: 'after' }
        );
    }

    /**
     * Ajouter une sous-tâche
     * @param {Object} db - Instance de la base de données MongoDB
     * @param {string} taskId - ID de la tâche
     * @param {Object} subTask - Sous-tâche à ajouter
     * @returns {Object} - Tâche mise à jour
     */
    static async addSubTask(db, taskId, subTask) {
        if (!ObjectId.isValid(taskId)) {
            throw new Error('Invalid task ID');
        }

        const newSubTask = {
            _id: new ObjectId(),
            title: subTask.title,
            date: subTask.date || new Date(),
            tag: subTask.tag || '',
            completed: false
        };

        return await db.collection('tasks').findOneAndUpdate(
            { _id: new ObjectId(taskId) },
            { 
                $push: { subTasks: newSubTask },
                $set: { updatedAt: new Date() }
            },
            { returnDocument: 'after' }
        );
    }
}

module.exports = Task;