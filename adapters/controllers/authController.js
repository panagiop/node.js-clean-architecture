import login from '../../application/use_cases/auth/login';

export default function authController(
  userDbRepository,
  userDbRepositoryImpl,
  authServiceInterface,
  authServiceImpl
) {
  const dbRepository = userDbRepository(userDbRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());

  const loginUser = (req, res, next) => {
    const { email, password } = req.body;
    login(email, password, dbRepository, authService)
      .then((token) => res.json(token))
      .catch((err) => next(err));
  };
  return {
    loginUser
  };
}
