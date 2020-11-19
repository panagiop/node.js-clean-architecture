import postRouter from './post';
import userRouter from './user';

export default function Routes(app, express, redisClient) {
  app.use('/api/v1/posts', postRouter(express, redisClient));
  app.use('/api/v1/users', userRouter(express, redisClient));
}
