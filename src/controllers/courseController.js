const Course = require('../models/Course');
const Category = require('../models/Category');

// POST /api/courses
exports.createCourse = async (req, res, next) => {
  try {
    const { title, description, price, category } = req.body;
    if (!title || price === undefined || !category) {
      return res.status(400).json({ success: false, message: 'title, price and category are required' });
    }
    if (isNaN(price) || Number(price) < 0) {
      return res.status(400).json({ success: false, message: 'price must be a number 0 or more' });
    }
    const cat = await Category.findById(category);
    if (!cat) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    const course = await Course.create({ title, description, price, category });
    res.status(201).json({ success: true, message: 'Course created', data: course });
  } catch (err) {
    next(err);
  }
};

// GET /api/courses
exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate('category', 'name').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: courses.length, data: courses });
  } catch (err) {
    next(err);
  }
};

// GET /api/courses/:id
exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate('category', 'name');
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, data: course });
  } catch (err) {
    next(err);
  }
};

// PUT /api/courses/:id
exports.updateCourse = async (req, res, next) => {
  try {
    const { title, description, price, category } = req.body;
    if (title !== undefined && !String(title).trim()) {
      return res.status(400).json({ success: false, message: 'title cannot be empty' });
    }
    if (price !== undefined && (isNaN(price) || Number(price) < 0)) {
      return res.status(400).json({ success: false, message: 'price must be a number 0 or more' });
    }
    if (category) {
      const cat = await Category.findById(category);
      if (!cat) {
        return res.status(404).json({ success: false, message: 'Category not found' });
      }
    }
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, price, category },
      { new: true, runValidators: true }
    );
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, message: 'Course updated', data: course });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/courses/:id
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, message: 'Course deleted' });
  } catch (err) {
    next(err);
  }
};
