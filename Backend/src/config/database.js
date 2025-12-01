const { MongoClient } = require('mongodb');

let db;
let client;

// Connect to MongoDB
const connectDB = async () => {
    try {
        const uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`;
        
        client = new MongoClient(uri);
        await client.connect();
        
        db = client.db(process.env.MONGO_DB_NAME);
        console.log(`Connected to MongoDB database: ${process.env.MONGO_DB_NAME}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

// Get database instance
const getDB = () => {
    if (!db) {
        throw new Error('Database not initialized. Call connectDB first.');
    }
    return db;
};

// Close connection
const closeDB = async () => {
    if (client) {
        await client.close();
        console.log('MongoDB connection closed');
    }
};

module.exports = { connectDB, getDB, closeDB };