export default function Login(email, password, userRepository, authService) {
  if (!email || !password) {
    throw new Error('email and password fields cannot be empty');
  }
  return userRepository.findByProperty({ email }).then((user) => {
    if (!user.length) {
      throw new Error(`Invalid credentials`);
    }
    const isMatch = authService.compare(password, user[0].hashedPassword);
    if (!isMatch) {
      throw new Error(`Invalid credentials`);
    }
    const payload = {
      user: {
        id: user[0].id
      }
    };
    return authService.generateToken(payload);
  });
}
