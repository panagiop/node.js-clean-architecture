import AddUser from '../../application/use_cases/user/add';
import FindByProperty from '../../application/use_cases/user/findByProperty';
import FindById from '../../application/use_cases/user/findById';

export default function PostController(
  UserDbRepository,
  UserDbRepositoryImplementation
) {
  const dbrepository = UserDbRepository(UserDbRepositoryImplementation());

  const fetchUserByProperty = (req, res, next) => {
    let params = {};

    // Dynamically create query params based on endpoint params
    for (let key in req.query) {
      if (Object.prototype.hasOwnProperty.call(req.query, key)) {
        params[key] = req.query[key];
      }
    }

    FindByProperty(params, dbrepository)
      .then((user) => res.json(user))
      .catch((error) => next(error));
  };

  const fetchUserById = (req, res, next) => {
    FindById(req.params.id, dbrepository)
      .then((user) => res.json(user))
      .catch((error) => next(error));
  };

  const addNewUser = (req, res, next) => {
    const { username, password, email, role, createdAt } = req.body;
    AddUser(username, password, email, role, createdAt, dbrepository)
      .then(() => res.json('user added'))
      .catch((error) => next(error));
  };

  return {
    fetchUserByProperty,
    fetchUserById,
    addNewUser
  };
}
