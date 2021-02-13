import Login from '../../application/use_cases/auth/login';

export default function AuthController(
  UserDbRepository,
  UserDbRepositoryImplementation,
  AuthService,
  AuthServiceImpl
) {
  const dbRepository = UserDbRepository(UserDbRepositoryImplementation());
  const authService = AuthService(AuthServiceImpl());

  const login = (req, res, next) => {
    const { email, password } = req.body;
    Login(email, password, dbRepository, authService)
      .then((token) => res.json(token))
      .catch((err) => next(err));
  };
  return {
    login
  };
}
