export default function FindByProperty(params, userRepository) {
  return userRepository.findByProperty(params);
}