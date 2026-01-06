require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, closeDB } = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    })
);

// Middleware to parse JSON requests
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Server is running!', 
        database: process.env.MONGO_DB_NAME 
    });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

// Connect to Database then start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Database: ${process.env.MONGO_DB_NAME}`);
    });
}).catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('shutting down server...');
    await closeDB();
    process.exit(0);
});