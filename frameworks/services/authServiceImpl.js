import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default function AuthServiceImpl() {
  const encryptPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  };
  const compare = (password, hashedPassword) =>
    bcrypt.compareSync(password, hashedPassword);
  const generateToken = (payload) => {
    return jwt.sign(payload, 'jkl!±@£!@ghj1237', {
      expiresIn: 360000
    });
  };
  return {
    encryptPassword,
    compare,
    generateToken
  };
}
