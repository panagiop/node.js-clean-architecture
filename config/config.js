export default {
  port: process.env.PORT || 6666,
  ip: process.env.HOST || '0.0.0.0',
  mongo: {
    uri: process.env.MONGO_URL || 'mongodb://localhost:27017/post-clean-code'
  }
};
