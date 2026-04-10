import post from '../../../src/entities/post';
import { normalizePostTags } from '../../../src/entities/normalizePostTags';

export default function addPost({
  title,
  description,
  createdAt,
  isPublished,
  userId,
  tags,
  postRepository
}) {
  // TODO: add a proper validation (consider using @hapi/joi)
  if (!title || !description) {
    throw new Error('title and description fields cannot be empty');
  }

  const normalizedTags = normalizePostTags(tags);

  const newPost = post({
    title,
    description,
    createdAt,
    isPublished,
    userId,
    tags: normalizedTags
  });

  return postRepository.add(newPost);
}
