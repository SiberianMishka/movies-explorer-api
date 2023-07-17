require('dotenv').config();

const { NODE_ENV, JWT_SECRET, PORT, BASE_PATH } = process.env;

const config = {
  nodeEnv: NODE_ENV || 'development',
  jwtSecret: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  port: PORT || 3000,
  basePath: BASE_PATH || 'mongodb://127.0.0.1:27017/bitfilmsdb',
};

module.exports = config;
