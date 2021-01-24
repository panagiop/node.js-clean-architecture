export default function User(username, hashedPassword, email, role, createdAt) {
  return {
    getUserName: () => username,
    getHashedPassword: () => hashedPassword,
    getEmail: () => email,
    getRole: () => role,
    getCreatedAt: () => createdAt
  };
}
