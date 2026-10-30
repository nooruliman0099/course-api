const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config/config');

const makeToken = (id) => jwt.sign({ id }, config.jwtSecret, { expiresIn: config.jwtExpires });

// POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'name, email and password are required' });
    }
    if (String(password).length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }
    if (User.findByEmail(email)) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }
    const user = await User.create({ name, email, password: String(password) });
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: User.safe(user),
      token: makeToken(user.id),
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'email and password are required' });
    }
    const user = User.findByEmail(email);
    if (!user || !(await User.matchPassword(user, String(password)))) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: User.safe(user),
      token: makeToken(user.id),
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/auth/me
exports.me = (req, res) => {
  res.status(200).json({ success: true, data: req.user });
};
