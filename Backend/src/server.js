require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB, closeDB } = require('./config/database');

const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware to handle CORS
app.use(
    cors({
        origin: process.env.CLIENT_URL || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Test route
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Server is running!', 
        database: process.env.MONGO_DB_NAME 
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

// Connect to Database then start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
    await closeDB();
    process.exit(0);
});