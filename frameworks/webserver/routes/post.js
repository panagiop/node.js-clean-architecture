import PostController from '../../../adapters/controllers/postController';
import PostDbRepository from '../../../application/repositories/postDbRepository';
import PostDbRepositoryMongoDB from '../../database/mongoDB/repositories/postRepositoryMongoDB';
import PostRedisRepository from '../../../application/repositories/postRedisRepository';
import PostRedisRepositoryImplementation from '../../database/redis/postRepositoryRedis';
import redisCachingMiddleware from '../middlewares/redisCachingMiddleware';

export default function PostRouter(express, redisClient) {
  const router = express.Router();

  // load controller with dependencies
  const controller = PostController(
    PostDbRepository,
    PostDbRepositoryMongoDB,
    redisClient,
    PostRedisRepository,
    PostRedisRepositoryImplementation
  );

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
