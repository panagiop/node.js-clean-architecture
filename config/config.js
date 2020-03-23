export default {
  port: 3002,
  mongo: {
    uri: process.env.MONGO_URL
    || 'mongodb://localhost:27017/post-clean-code'
  }
};
