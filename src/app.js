const express = require('express');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const courseRoutes = require('./routes/courseRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Course API is running' }));

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/courses', courseRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
