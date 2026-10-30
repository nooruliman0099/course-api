const store = require('../data/store');

let nextId = 1;

exports.create = ({ name, description }) => {
  const now = new Date().toISOString();
  const category = { id: nextId++, name, description: description || '', createdAt: now, updatedAt: now };
  store.categories.push(category);
  return category;
};

exports.findAll = () => [...store.categories].reverse();

exports.findById = (id) => store.categories.find((c) => c.id === Number(id));

exports.findByName = (name) =>
  store.categories.find((c) => c.name.toLowerCase() === String(name).trim().toLowerCase());

exports.update = (id, { name, description }) => {
  const category = exports.findById(id);
  if (!category) return null;
  if (name !== undefined) category.name = name;
  if (description !== undefined) category.description = description;
  category.updatedAt = new Date().toISOString();
  return category;
};

exports.remove = (id) => {
  const index = store.categories.findIndex((c) => c.id === Number(id));
  if (index === -1) return false;
  store.categories.splice(index, 1);
  return true;
};
