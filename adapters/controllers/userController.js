import addUser from '../../application/use_cases/user/add';
import findByProperty from '../../application/use_cases/user/findByProperty';
import findById from '../../application/use_cases/user/findById';

export default function userController(
  userDbRepository,
  userDbRepositoryImpl,
  authServiceInterface,
  authServiceImpl
) {
  const dbRepository = userDbRepository(userDbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());

  const fetchUserByProperty = (req, res, next) => {
    let params = {};

    // Dynamically create query params based on endpoint params
    for (let key in req.query) {
      if (Object.prototype.hasOwnProperty.call(req.query, key)) {
        params[key] = req.query[key];
      }
    }

    findByProperty(params, dbRepository)
      .then((user) => res.json(user))
      .catch((error) => next(error));
  };

  const fetchUserById = (req, res, next) => {
    findById(req.params.id, dbRepository)
      .then((user) => res.json(user))
      .catch((error) => next(error));
  };

  const addNewUser = (req, res, next) => {
    const { username, password, email, role, createdAt } = req.body;
    addUser(username, password, email, role, createdAt, dbRepository, authService)
      .then(() => res.json('user added'))
      .catch((error) => next(error));
  };

  return {
    fetchUserByProperty,
    fetchUserById,
    addNewUser
  };
}
