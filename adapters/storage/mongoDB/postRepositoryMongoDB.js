import PostModel from '../../../frameworks/database/mongoDB/models/post';

export default function PostRepositoryMongoDB() {
  const findAll = () => PostModel.find();

  const findById = (id) => PostModel.findById(id);

  const add = (postEntity) => {
    const newPost = new PostModel({
      title: postEntity.getTitle(),
      description: postEntity.getDescription(),
      createdAt: new Date(),
      isPublished: postEntity.isPublished(),
      userId: postEntity.getUserId()
    });
    
    return newPost.save();
  };

  const updateById = (id, postEntity) => {
    const updatedPost = {
      title: postEntity.getTitle(),
      description: postEntity.getDescription(),
      createdAt: new Date(),
      isPublished: postEntity.isPublished()
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
    findById,
    add,
    updateById,
    deleteById
  };
}
