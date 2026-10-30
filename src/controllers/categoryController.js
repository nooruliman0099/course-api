const Category = require('../models/Category');

// POST /api/categories
exports.createCategory = (req, res, next) => {
  try {
    const { name, description } = req.body || {};
    if (!name || !String(name).trim()) {
      return res.status(400).json({ success: false, message: 'name is required' });
    }
    if (Category.findByName(name)) {
      return res.status(400).json({ success: false, message: 'Category already exists' });
    }
    const category = Category.create({ name: String(name).trim(), description });
    res.status(201).json({ success: true, message: 'Category created', data: category });
  } catch (err) {
    next(err);
  }
};

// GET /api/categories
exports.getCategories = (req, res, next) => {
  try {
    const categories = Category.findAll();
    res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (err) {
    next(err);
  }
};

// GET /api/categories/:id
exports.getCategory = (req, res, next) => {
  try {
    const category = Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
};

// PUT /api/categories/:id
exports.updateCategory = (req, res, next) => {
  try {
    const { name, description } = req.body || {};
    if (name !== undefined && !String(name).trim()) {
      return res.status(400).json({ success: false, message: 'name cannot be empty' });
    }
    const existing = Category.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    if (name !== undefined) {
      const same = Category.findByName(name);
      if (same && same.id !== existing.id) {
        return res.status(400).json({ success: false, message: 'Category already exists' });
      }
    }
    const category = Category.update(req.params.id, {
      name: name !== undefined ? String(name).trim() : undefined,
      description,
    });
    res.status(200).json({ success: true, message: 'Category updated', data: category });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/categories/:id
exports.deleteCategory = (req, res, next) => {
  try {
    const deleted = Category.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, message: 'Category deleted' });
  } catch (err) {
    next(err);
  }
};
