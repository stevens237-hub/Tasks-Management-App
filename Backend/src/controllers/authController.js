const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
}

// Register User
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
    try{
        const { username, email, password } = req.body;

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
        const existingUser = await User.findOne({ 
                $or: [{ email }, { username }]
            });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            createdAt: new Date(),
        });

        const savedUser = await newUser.save();

        // Generate token
        const token = generateToken(savedUser._id);

        // return userr data with token
        res.status(201).json({
            message: 'User registered successfully',
            token: token,
            user:{
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            }
            
            
        });
    }catch(error){
        console.error('Error registering user:', error);
        res.status(500).json({ error: "Failed to register user" });
    }
};

// Login User
// @route   POST /api/auth/login
// Authenticate user and get token
const loginUser = async (req, res) => {
    try{
        const { username, password } = req.body;

        // Validation
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and Password required fields' });
        }

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
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
    }catch(error){
        console.error('Error loggin in:',error);
        res.status(500).json({ message: 'Failed to login' });
    }
};

// Logout User
// @route   POST /api/auth/logout
const logoutUser = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
};

// Get User Profile
// @route   GET /api/auth/profile
// Get logged in user profile
const getUserProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user._id).select('-password');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
};

// Update User Profile
// @route   PUT /api/auth/profile
// Update logged in user profile
const updateUserProfile = async (req, res) => {
    try{

    }catch(error){
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    updateUserProfile,
};