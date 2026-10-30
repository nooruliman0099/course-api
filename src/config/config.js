module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'mysecretkey123',
  jwtExpires: process.env.JWT_EXPIRES_IN || '1d',
};
