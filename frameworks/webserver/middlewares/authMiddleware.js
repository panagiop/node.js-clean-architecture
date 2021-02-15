import AuthServiceImpl from '../../services/authServiceImpl';
import AuthService from '../../../application/services/authService';

export default function authMiddleware(req, res, next) {
  const authService = AuthService(AuthServiceImpl());
  // Get token from header
  const token = req.header('Authorization');
  if (!token) {
    throw new Error('No token found, authorization denied');
  }
  try {
    const decoded = authService.verify(token);
    req.user = decoded.user;
    next();
  } catch (err) {
    throw new Error('Token is not valid');
  }
}
