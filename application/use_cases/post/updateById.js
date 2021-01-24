import Post from '../../../src/entities/post';

export default function UpdateById(
  id,
  title,
  description,
  createdAt,
  isPublished,
  userId,
  postRepository
) {
  // validate
  if (!title || !description) {
    throw new Error('title and description fields are mandatory');
  }
  const updatedPost = Post(title, description, createdAt, isPublished, userId);

  return postRepository.findById(id).then((post) => {
    if (!post) throw new Error(`No post found with id: ${id}`);
    return postRepository.updateById(id, updatedPost);
  });
}
