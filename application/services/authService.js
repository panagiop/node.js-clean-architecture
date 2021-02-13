export default function AuthService(service) {
  const compare = (password, hashedPassword) =>
    service.compare(password, hashedPassword);
  const generateToken = (payload) => service.generateToken(payload);
  return {
    compare,
    generateToken
  };
}
