// Unknown URL -> 404
const notFound = (req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
};

// Any other error
const errorHandler = (err, req, res, next) => {
  // Bad JSON in request body -> 400
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'Invalid JSON in request body' });
  }
  console.error(err);
  res.status(500).json({ success: false, message: 'Server error' });
};

module.exports = { notFound, errorHandler };
