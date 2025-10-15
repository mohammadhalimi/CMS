import { PostModel } from '../../framework-drivers/database/model/post.model';
import { Post } from '../../entities/post.entity';

export const PostRepository = {
  async create(post: Post) {
    const newPost = new PostModel(post);
    return await newPost.save();
  },

  async findAll() {
    return await PostModel.find().sort({ createdAt: -1 });
  },

  async findById(id: string) {
    return await PostModel.findById(id);
  },

  async update(id: string, data: Partial<Post>) {
    return await PostModel.findByIdAndUpdate(id, data, { new: true });
  },

  async delete(id: string) {
    return await PostModel.findByIdAndDelete(id);
  }
};
