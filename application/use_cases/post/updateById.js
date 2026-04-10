import post from '../../../src/entities/post';
import { tagsForUpdate } from '../../../src/entities/normalizePostTags';

export default function updateById({
  id,
  title,
  description,
  createdAt,
  isPublished,
  userId,
  tags,
  postRepository
}) {
  // validate
  if (!title || !description) {
    throw new Error('title and description fields are mandatory');
  }

  return postRepository.findById(id).then((foundPost) => {
    if (!foundPost) {
      throw new Error(`No post found with id: ${id}`);
    }

    const nextTags = tagsForUpdate(foundPost.tags, tags);

    const updatedPost = post({
      title,
      description,
      createdAt,
      isPublished,
      userId,
      tags: nextTags
    });

    return postRepository.updateById(id, updatedPost);
  });
}
