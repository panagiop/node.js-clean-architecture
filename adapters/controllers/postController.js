import FindAll from '../../application/use_cases/post/findAll';
import AddPost from '../../application/use_cases/post/add';
import FindById from '../../application/use_cases/post/findById';
import UpdateById from '../../application/use_cases/post/updateById';
import DeletePost from '../../application/use_cases/post/deleteΒyId';

export default function PostController(PostRepository, PostRepositoryImplementation) {
  const repository = PostRepository(PostRepositoryImplementation());

  const fetchAllPosts = (req, res, next) => {
    FindAll(repository)
      .then(posts => res.json(posts))
      .catch((error) => next(error))
  };

  const fetchPostById = (req, res, next) => {
    FindById(req.params.id, repository)
      .then((post) => res.json(post))
      .catch((error) => next(error));
  };

  const addNewPost = (req, res, next) => {
    const { title, description, createdAt, isPublished, userId } = req.body;
    AddPost(title, description, createdAt, isPublished, userId, repository)
      .then(() => res.json('post added'))
      .catch((error) => next(error));
  };

  const deletePostById = (req, res, next) => {
    DeletePost(req.params.id, repository)
      .then((message) => res.json(message))
      .catch((error) => next(error));
  };

  const updatePostById = (req, res, next) => {
    const { title, description, createdAt, isPublished, userId } = req.body;
    UpdateById(req.params.id, title, description, createdAt, userId, isPublished, repository)
      .then((message) => res.json(message))
      .catch((error) => next(error));
  };

  return {
    fetchAllPosts,
    addNewPost,
    fetchPostById,
    updatePostById,
    deletePostById
  };
}
