export default function authService(service) {
  const encryptPassword = (password) => service.encryptPassword(password);

  const compare = (password, hashedPassword) =>
    service.compare(password, hashedPassword);

  const verify = (token) => service.verify(token);

  const generateToken = (payload) => service.generateToken(payload);

  return {
    encryptPassword,
    compare,
    verify,
    generateToken
  };
}
