import postRouter from './post';
import userRouter from './user';

export default function Routes(app, express) {
  app.use('/api/v1/posts', postRouter(express));
  app.use('/api/v1/users', userRouter(express));
}
