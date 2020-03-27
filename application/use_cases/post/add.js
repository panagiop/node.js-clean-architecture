import Post from '../../../src/entities/post';

export default function AddPost(
  title,
  description,
  createdAt,
  isPublished,
  userId,
  postRepository
) {
  // TODO: add a proper validation (consider using @hapi/joi)
  if (!title || !description) {
    throw new Error('title and description fields cannot be empty');
  }

  const post = Post(
    title,
    description,
    createdAt,
    isPublished,
    userId
  );

  return postRepository.add(post);
}
