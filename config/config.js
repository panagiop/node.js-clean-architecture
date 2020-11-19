export default {
  port: process.env.PORT || 1234,
  ip: process.env.HOST || '0.0.0.0',
  mongo: {
    uri: process.env.MONGO_URL || 'mongodb://localhost:27017/post-clean-code'
  },
  redis: {
    uri: process.env.REDIS_URL || 'redis://localhost:6379'
  }
};
