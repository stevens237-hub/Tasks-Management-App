const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const { ObjectId } = require('mongodb');
const { getDB } = require('../config/database');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

// Register User
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const db = getDB();

        // Validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Validation avec le package validator
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        
        if (!validator.isLength(password, { min: 6 })) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Check if user already exists
        const existingUser = await db.collection('users').findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = {
            username,
            email,
            password: hashedPassword,
            createdAt: new Date(),
        };

        const result = await db.collection('users').insertOne(newUser);

        // Generate token
        const token = generateToken(result.insertedId);

        // Return user data with token
        res.status(201).json({
            message: 'User registered successfully',
            token: token,
            user: {
                _id: result.insertedId,
                username: newUser.username,
                email: newUser.email,
            }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: "Failed to register user" });
    }
};

// Login User
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const db = getDB();

        // Validation
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and Password required fields' });
        }

        // Find user by username
        const user = await db.collection('users').findOne({ username });
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate token
        const token = generateToken(user._id);

        // Return user data with token
        res.json({
            message: 'Login successful',
            token: token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Failed to login' });
    }
};

// Logout User
// @route   POST /api/auth/logout
const logoutUser = async (req, res) => {
    try {
        // With JWT, logout is handled on the client side
        res.json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get User Profile
// @route   GET /api/auth/profile
const getUserProfile = async (req, res) => {
    try {
        const db = getDB();
        const user = await db.collection('users').findOne(
            { _id: new ObjectId(req.user._id) },
            { projection: { password: 0 } } // Exclude password
        );
        
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update User Profile
// @route   PUT /api/auth/profile
const updateUserProfile = async (req, res) => {
    try {
        const db = getDB();
        const { username, email } = req.body;
        
        const updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        
        const result = await db.collection('users').updateOne(
            { _id: new ObjectId(req.user._id) },
            { $set: updateData }
        );
        
        if (result.modifiedCount > 0) {
            res.json({ message: 'Profile updated successfully' });
        } else {
            res.status(400).json({ message: 'No changes made' });
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
};