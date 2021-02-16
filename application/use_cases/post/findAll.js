export default function findAll(userId, postRepository) {
  return postRepository.findAll(userId);
}
