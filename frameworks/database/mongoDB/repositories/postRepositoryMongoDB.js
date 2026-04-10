import PostModel from '../models/post';
import buildPostMongoFilter from './postQueryBuilder';

export default function postRepositoryMongoDB() {
  const findAll = (params) => {
    const filter = buildPostMongoFilter(params);
    return PostModel.find(filter)
      .skip(params.perPage * params.page - params.perPage)
      .limit(params.perPage);
  };

  const countAll = (params) => {
    const filter = buildPostMongoFilter(params);
    return PostModel.countDocuments(filter);
  };

  const findById = (id) => PostModel.findById(id);

  const add = (postEntity) => {
    const newPost = new PostModel({
      title: postEntity.getTitle(),
      description: postEntity.getDescription(),
      createdAt: new Date(),
      isPublished: postEntity.isPublished(),
      userId: postEntity.getUserId(),
      tags: postEntity.getTags()
    });

    return newPost.save();
  };

  const updateById = (id, postEntity) => {
    const updatedPost = {
      title: postEntity.getTitle(),
      description: postEntity.getDescription(),
      isPublished: postEntity.isPublished(),
      tags: postEntity.getTags()
    };

    return PostModel.findOneAndUpdate(
      { _id: id },
      { $set: updatedPost },
      { new: true }
    );
  };

  const deleteById = (id) => PostModel.findByIdAndRemove(id);

  return {
    findAll,
    countAll,
    findById,
    add,
    updateById,
    deleteById
  };
}
