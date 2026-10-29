const express = require('express');
const c = require('../controllers/courseController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/', c.getCourses);
router.get('/:id', c.getCourse);
router.post('/', protect, c.createCourse);
router.put('/:id', protect, c.updateCourse);
router.delete('/:id', protect, c.deleteCourse);

module.exports = router;
