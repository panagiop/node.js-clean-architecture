export default function findById(id, userRepository) {
  return userRepository.findById(id);
}
