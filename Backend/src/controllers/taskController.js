const { ObjectId } = require('mongodb');
const { getDB } = require('../config/database');

// Create Task
// @route   POST /api/tasks
const createTask = async (req, res) => {
    try {
        const { title, team, stage, date, priority, assets, description } = req.body;
        const db = getDB();
        const userId = req.user.id; // Assuming user ID is available in req.user

        // Validation
        if (!title || !description || !stage || !date || !priority) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Create new task
        const newTask = {
            title,
            team,
            stage: stage.toLowerCase(),
            date: new Date(date),
            priority: priority.toLowerCase(),
            assets,
            description,
            createdBy: ObjectId(userId),
            createdAt: new Date(),
        };
        const result = await db.collection('tasks').insertOne(newTask);


        return res.status(201).json({ 
            message: 'Task created successfully', 
            taskId: result.insertedId 
        });
    }
    catch (error) {
        console.error('Error creating task:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


// @route   POST /api/tasks/:taskId/subtasks
const createSubTask = async (req, res) => {
};

// @route   GET /api/tasks
const getTasks = async (req, res) => {
}




