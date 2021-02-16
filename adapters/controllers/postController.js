import findAll from '../../application/use_cases/post/findAll';
import addPost from '../../application/use_cases/post/add';
import findById from '../../application/use_cases/post/findById';
import updateById from '../../application/use_cases/post/updateById';
import deletePost from '../../application/use_cases/post/deleteΒyId';

export default function PostController(
  postDbRepository,
  postDbRepositoryImpl,
  cachingClient,
  postCachingRepository,
  postCachingRepositoryImpl
) {
  const dbRepository = postDbRepository(postDbRepositoryImpl());
  const cachingRepository = postCachingRepository(
    postCachingRepositoryImpl()(cachingClient)
  );

  const fetchAllPosts = (req, res, next) => {
    findAll(dbRepository)
      .then((posts) => {
        const cachingOptions = {
          key: 'posts_',
          expireTimeSec: 120,
          data: JSON.stringify(posts)
        };
        // cache the result to redis
        cachingRepository.setCache(cachingOptions);
        return res.json(posts);
      })
      .catch((error) => next(error));
  };

  const fetchPostById = (req, res, next) => {
    findById(req.params.id, dbRepository)
      .then((post) => res.json(post))
      .catch((error) => next(error));
  };

  const addNewPost = (req, res, next) => {
    const { title, description } = req.body;

    addPost({
      title: title,
      description: description,
      userId: req.user.id,
      postRepository: dbRepository
    })
      .then((post) => {
        const cachingOptions = {
          key: 'posts_',
          expireTimeSec: 120,
          data: JSON.stringify(post)
        };
        // cache the result to redis
        cachingRepository.setCache(cachingOptions);
        return res.json('post added');
      })
      .catch((error) => next(error));
  };

  const deletePostById = (req, res, next) => {
    deletePost(req.params.id, dbRepository)
      .then((message) => res.json(message))
      .catch((error) => next(error));
  };

  const updatePostById = (req, res, next) => {
    const { title, description, createdAt, isPublished, userId } = req.body;
    updateById(
      req.params.id,
      title,
      description,
      createdAt,
      userId,
      isPublished,
      dbRepository
    )
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
