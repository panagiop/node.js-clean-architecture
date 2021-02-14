export default function AuthService(service) {
  const encryptPassword = (password) => service.encryptPassword(password);
  const compare = (password, hashedPassword) =>
    service.compare(password, hashedPassword);
  const generateToken = (payload) => service.generateToken(payload);
  return {
    encryptPassword,
    compare,
    generateToken
  };
}
