const bcrypt = require('bcryptjs');
const store = require('../data/store');

let nextId = 1;

exports.create = async ({ name, email, password }) => {
  const user = {
    id: nextId++,
    name,
    email: email.toLowerCase(),
    password: await bcrypt.hash(password, 10),
    createdAt: new Date().toISOString(),
  };
  store.users.push(user);
  return user;
};

exports.findByEmail = (email) => store.users.find((u) => u.email === String(email).toLowerCase());

exports.findById = (id) => store.users.find((u) => u.id === Number(id));

exports.matchPassword = (user, plain) => bcrypt.compare(plain, user.password);

// user data without password
exports.safe = (u) => ({ id: u.id, name: u.name, email: u.email });
