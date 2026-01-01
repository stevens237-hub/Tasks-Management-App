const express = require('express');
const {
    createTask,
    getTasks,
    getTask,
    updateTask,
    trashTask,
    deleteRestoreTask,
    getDashboardStats,
    createSubTask,
    postTaskActivity
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Route pour les statistiques du tableau de bord
router.get('/dashboard', protect, getDashboardStats);

// Routes CRUD de base (toutes protégées)
router.post('/create', protect, createTask);
router.get('/', protect, getTasks);
router.get('/:id', protect, getTask);
router.put('/update/:id', protect, updateTask);
router.put('/trash/:id', protect, trashTask);

// Route avec ID pour delete/restore individuel
router.delete('/delete-restore/:id', protect, deleteRestoreTask);

// Route sans ID pour deleteAll/restoreAll
router.delete('/delete-restore', protect, deleteRestoreTask);


module.exports = router;