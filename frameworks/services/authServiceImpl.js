import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export default function AuthServiceImpl() {
  const compare = (password, hashedPassword) =>
    bcrypt.compareSync(password, hashedPassword);
  const generateToken = (payload) => {
    return jwt.sign(payload, 'jkl!±@£!@ghj1237', {
      expiresIn: 360000
    });
  };
  return {
    compare,
    generateToken
  };
}
