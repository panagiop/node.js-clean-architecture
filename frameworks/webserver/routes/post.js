import PostController from '../../../adapters/controllers/postController';
import PostRepository from '../../../application/repositories/postRepository';
import PostRepositoryMongoDB from '../../../adapters/storage/mongoDB/postRepositoryMongoDB';

export default function PostRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const controller = PostController(PostRepository, PostRepositoryMongoDB);

  // GET endpoints
  router.route('/').get(controller.fetchAllPosts);
  router.route('/:id').get(controller.fetchPostById);

  // POST endpoints
  router.route('/').post(controller.addNewPost);

  // PUT endpoints
  router.route('/:id').put(controller.updatePostById);

  // DELETE endpoints
  router.route('/:id').delete(controller.deletePostById);

  return router;
}
