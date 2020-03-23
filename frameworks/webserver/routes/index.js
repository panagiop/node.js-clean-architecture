import postRouter from './post';
import userRouter from './user';

export default function Routes(app, express) {
  app.use('/api/post', postRouter(express));
  app.use('/api/user', userRouter(express));
}
