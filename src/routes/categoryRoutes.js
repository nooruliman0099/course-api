const express = require('express');
const c = require('../controllers/categoryController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', c.getCategories);
router.get('/:id', c.getCategory);
router.post('/', protect, c.createCategory);
router.put('/:id', protect, c.updateCategory);
router.delete('/:id', protect, c.deleteCategory);

module.exports = router;
