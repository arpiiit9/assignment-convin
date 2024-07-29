import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.js'; // Import the JWT utility functions

// Create a new user and return a JWT token
export const renderLoginPage = (req, res) => {
  res.render('login');
};

export const renderSignupPage = (req, res) => {
  res.render('signup');
};

export const createUser = async (req, res) => {
  const { name, email, mobile, password } = req.body; // Assume password is required for login
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, mobile, password: hashedPassword });
    const savedUser = await newUser.save();

    // Generate a JWT token
    const token = generateToken(savedUser);

    res.status(201).json({ user: savedUser, token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Get user details (requires JWT authentication)
export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user details' });
  }
};
