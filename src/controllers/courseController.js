const Course = require('../models/Course');
const Category = require('../models/Category');

// add category name inside the course data
const withCategory = (course) => {
  const cat = Category.findById(course.category);
  return { ...course, category: cat ? { id: cat.id, name: cat.name } : null };
};

// POST /api/courses
exports.createCourse = (req, res, next) => {
  try {
    const { title, description, price, category } = req.body || {};
    if (!title || price === undefined || category === undefined) {
      return res.status(400).json({ success: false, message: 'title, price and category are required' });
    }
    if (isNaN(price) || Number(price) < 0) {
      return res.status(400).json({ success: false, message: 'price must be a number 0 or more' });
    }
    if (!Category.findById(category)) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    const course = Course.create({ title, description, price, category });
    res.status(201).json({ success: true, message: 'Course created', data: withCategory(course) });
  } catch (err) {
    next(err);
  }
};

// GET /api/courses
exports.getCourses = (req, res, next) => {
  try {
    const courses = Course.findAll().map(withCategory);
    res.status(200).json({ success: true, count: courses.length, data: courses });
  } catch (err) {
    next(err);
  }
};

// GET /api/courses/:id
exports.getCourse = (req, res, next) => {
  try {
    const course = Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, data: withCategory(course) });
  } catch (err) {
    next(err);
  }
};

// PUT /api/courses/:id
exports.updateCourse = (req, res, next) => {
  try {
    const { title, description, price, category } = req.body || {};
    if (title !== undefined && !String(title).trim()) {
      return res.status(400).json({ success: false, message: 'title cannot be empty' });
    }
    if (price !== undefined && (isNaN(price) || Number(price) < 0)) {
      return res.status(400).json({ success: false, message: 'price must be a number 0 or more' });
    }
    if (!Course.findById(req.params.id)) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    if (category !== undefined && !Category.findById(category)) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    const course = Course.update(req.params.id, { title, description, price, category });
    res.status(200).json({ success: true, message: 'Course updated', data: withCategory(course) });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/courses/:id
exports.deleteCourse = (req, res, next) => {
  try {
    const deleted = Course.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }
    res.status(200).json({ success: true, message: 'Course deleted' });
  } catch (err) {
    next(err);
  }
};
