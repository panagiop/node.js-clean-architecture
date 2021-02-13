import AuthController from '../../../adapters/controllers/authController';
import UserDbRepository from '../../../application/repositories/userDbRepository';
import UserDbRepositoryMongoDB from '../../database/mongoDB/repositories/userRepositoryMongoDB';
import AuthService from '../../../application/services/authService';
import AuthServiceImpl from '../../services/authServiceImpl';

export default function UserRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const controller = AuthController(
    UserDbRepository,
    UserDbRepositoryMongoDB,
    AuthService,
    AuthServiceImpl
  );

  // POST enpdpoints
  router.route('/').post(controller.login);

  return router;
}
