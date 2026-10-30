const store = require('../data/store');

let nextId = 1;

exports.create = ({ title, description, price, category }) => {
  const now = new Date().toISOString();
  const course = {
    id: nextId++,
    title,
    description: description || '',
    price: Number(price),
    category: Number(category),
    createdAt: now,
    updatedAt: now,
  };
  store.courses.push(course);
  return course;
};

exports.findAll = () => [...store.courses].reverse();

exports.findById = (id) => store.courses.find((c) => c.id === Number(id));

exports.update = (id, { title, description, price, category }) => {
  const course = exports.findById(id);
  if (!course) return null;
  if (title !== undefined) course.title = title;
  if (description !== undefined) course.description = description;
  if (price !== undefined) course.price = Number(price);
  if (category !== undefined) course.category = Number(category);
  course.updatedAt = new Date().toISOString();
  return course;
};

exports.remove = (id) => {
  const index = store.courses.findIndex((c) => c.id === Number(id));
  if (index === -1) return false;
  store.courses.splice(index, 1);
  return true;
};
