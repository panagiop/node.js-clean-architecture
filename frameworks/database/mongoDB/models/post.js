import mongoose from 'mongoose';

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;
const PostsSchema = new Schema({
  title: {
    type: String,
    unique: true
  },
  description: String,
  createdAt: {
    type: 'Date',
    default: Date.now
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const PostModel = mongoose.model('Post', PostsSchema);
export default PostModel;
