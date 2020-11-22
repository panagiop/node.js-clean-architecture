import UserController from '../../../adapters/controllers/userController';
import UserDbRepository from '../../../application/repositories/userDbRepository';
import UserDbRepositoryMongoDB from '../../database/mongoDB/repositories/userRepositoryMongoDB';

export default function UserRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const controller = UserController(UserDbRepository, UserDbRepositoryMongoDB);

  // GET enpdpoints
  router.route('/:id').get(controller.fetchUserById);
  router.route('/').get(controller.fetchUserByProperty);

  // POST enpdpoints
  router.route('/').post(controller.addNewUser);

  return router;
}
