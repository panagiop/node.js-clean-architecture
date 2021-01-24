import mongoose from 'mongoose';
import crypto from 'crypto';

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    index: true
  },
  hashedPassword: {
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

UserSchema.methods.makeSalt = function makeSalt() {
  return crypto.randomBytes(16).toString('base64');
};

UserSchema.methods.encryptPassword = function encryptPassword(password) {
  if (!password) return '';
  const salt = new Buffer(this.makeSalt(), 'base64');
  return crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('base64');
};

UserSchema.virtual('password')
  .set(function setPassword(password) {
    this._password = password;
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function getPassword() {
    return this._password;
  });

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
