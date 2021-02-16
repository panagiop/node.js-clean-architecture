import userController from '../../../adapters/controllers/userController';
import userDbRepository from '../../../application/repositories/userDbRepository';
import userDbRepositoryMongoDB from '../../database/mongoDB/repositories/userRepositoryMongoDB';
import authServiceInterface from '../../../application/services/authService';
import authServiceImpl from '../../services/authService';
import authMiddleware from '../middlewares/authMiddleware';

export default function userRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const controller = userController(
    userDbRepository,
    userDbRepositoryMongoDB,
    authServiceInterface,
    authServiceImpl
  );

  // GET enpdpoints
  router.route('/:id').get(authMiddleware, controller.fetchUserById);
  router.route('/').get(authMiddleware, controller.fetchUsersByProperty);

  // POST enpdpoints
  router.route('/').post(controller.addNewUser);

  return router;
}
