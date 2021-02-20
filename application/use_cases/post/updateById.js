import post from '../../../src/entities/post';

export default function updateById({
  id,
  title,
  description,
  createdAt,
  isPublished,
  userId,
  postRepository
}) {
  // validate
  if (!title || !description) {
    throw new Error('title and description fields are mandatory');
  }
  const updatedPost = post({
    title,
    description,
    createdAt,
    isPublished,
    userId
  });

  return postRepository.findById(id).then((foundPost) => {
    if (!foundPost) {
      throw new Error(`No post found with id: ${id}`);
    }
    return postRepository.updateById(id, updatedPost);
  });
}
