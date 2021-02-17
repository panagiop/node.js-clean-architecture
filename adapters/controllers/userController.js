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

  const fetchUsersByProperty = (req, res, next) => {
    let params = {};

    // Dynamically created query params based on endpoint params
    for (let key in req.query) {
      if (Object.prototype.hasOwnProperty.call(req.query, key)) {
        params[key] = req.query[key];
      }
    }
    // reserved query params (apart from dynamically) for pagination
    params.page = params.page ? parseInt(params.page) : 1;
    params.perPage = params.perPage ? parseInt(params.perPage) : 10;

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
    fetchUsersByProperty,
    fetchUserById,
    addNewUser
  };
}
