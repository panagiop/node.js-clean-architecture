import mongoose from 'mongoose';

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    index: true
  },
  password: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    lowercase: true
  },
  role: {
    type: String,
    default: 'test_user'
  },
  createdAt: Date
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
