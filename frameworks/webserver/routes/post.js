import PostController from '../../../adapters/controllers/postController';
import PostRepository from '../../../application/repositories/postRepository';
import PostRepositoryMongoDB from '../../database/mongoDB/repositories/postRepositoryMongoDB';
import redisCachingMiddleware from '../middlewares/redisCachingMiddleware';

export default function PostRouter(express, redisClient) {
  const router = express.Router();

  // load controller with dependencies
  const controller = PostController(PostRepository, PostRepositoryMongoDB, redisClient);

  // GET endpoints
  router.route('/').get(redisCachingMiddleware(redisClient, 'posts'), controller.fetchAllPosts);
  router.route('/:id').get(redisCachingMiddleware(redisClient, 'post'), controller.fetchPostById);

  // POST endpoints
  router.route('/').post(controller.addNewPost);

  // PUT endpoints
  router.route('/:id').put(controller.updatePostById);

  // DELETE endpoints
  router.route('/:id').delete(controller.deletePostById);

  return router;
}
