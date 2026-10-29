const jwt = require('jsonwebtoken');
const User = require('../models/User');

const makeToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' });

// POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'name, email and password are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: { id: user._id, name: user.name, email: user.email },
      token: makeToken(user._id),
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'email and password are required' });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: { id: user._id, name: user.name, email: user.email },
      token: makeToken(user._id),
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/auth/me
exports.me = (req, res) => {
  res.status(200).json({ success: true, data: req.user });
};
