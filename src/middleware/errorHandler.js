// Unknown URL -> 404
const notFound = (req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
};

// Any other error
const errorHandler = (err, req, res, next) => {
  // Wrong ID format -> 404
  if (err.name === 'CastError') {
    return res.status(404).json({ success: false, message: 'Resource not found (invalid ID)' });
  }
  // Mongoose validation error -> 400
  if (err.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: err.message });
  }
  // Duplicate value -> 400
  if (err.code === 11000) {
    return res.status(400).json({ success: false, message: 'Duplicate value, already exists' });
  }
  console.error(err);
  res.status(500).json({ success: false, message: 'Server error' });
};

module.exports = { notFound, errorHandler };
