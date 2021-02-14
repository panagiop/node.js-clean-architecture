export default function User(username, password, email, role, createdAt) {
  return {
    getUserName: () => username,
    getPassword: () => password,
    getEmail: () => email,
    getRole: () => role,
    getCreatedAt: () => createdAt
  };
}
