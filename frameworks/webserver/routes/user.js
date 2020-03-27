import UserController from '../../../adapters/controllers/userController';
import UserRepository from '../../../application/repositories/userRepository';
import UserRepositoryMongoDB from '../../../adapters/storage/mongoDB/userRepositoryMongoDB';

export default function UserRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const controller = UserController(UserRepository, UserRepositoryMongoDB);

  // GET enpdpoints
  router.route('/:id').get(controller.fetchUserById);
  router.route('/').get(controller.fetchUserByProperty);

  // POST enpdpoints
  router.route('/').post(controller.addNewUser);

  return router;
}
