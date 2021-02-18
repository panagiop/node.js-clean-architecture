import PostModel from '../models/post';

export default function postRepositoryMongoDB() {
  const findAll = (params) => {
    return PostModel.find(omit(params, 'page', 'perPage'))
      .skip(
        parseInt(params.perPage) * parseInt(params.page) -
          parseInt(params.perPage)
      )
      .limit(parseInt(params.perPage));
  }

  const countAll = (params) => {
    return PostModel.countDocuments(omit(params, 'page', 'perPage'));
  }

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
      isPublished: postEntity.isPublished()
    };

    return PostModel.findOneAndUpdate(
      { _id: id },
      { $set: updatedPost },
      { new: true }
    );
  };

  const deleteById = (id) => PostModel.findByIdAndRemove(id);

  function omit(obj, ...props) {
    const result = { ...obj };
    props.forEach((prop) => delete result[prop]);
    return result;
  }

  return {
    findAll,
    countAll,
    findById,
    add,
    updateById,
    deleteById
  };
}
