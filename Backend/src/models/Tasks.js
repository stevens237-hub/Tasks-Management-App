const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        text: { type: String, required: true },
        completed: { type: Boolean, default: false }
    }
);

const taskSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
        status: { type: String, enum: ['todo', 'In-progress', 'Completed'], default: 'todo' },
        dueDate: { type: Date, required: true },
        subtasks: [todoSchema],
        attachments: [{ type: String }],

    },
    { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);