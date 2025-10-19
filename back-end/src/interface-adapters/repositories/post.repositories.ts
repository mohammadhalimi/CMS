import { PostModel } from '../../framework-drivers/database/model/post.model';
import { Post } from '../../entities/post.entity';

export const PostRepository = {
  async create(post: Post) {
    const newPost = new PostModel(post);
    return await newPost.save();
  },

  async findAll() {
    return await PostModel.find()
      .populate({
        path: 'authorId',
        select: 'name email profileImage bio',
      })
      .sort({ createdAt: -1 })
      .lean(); // خروجی سبک و JSON-ready
  },

  async findById(id: string) {
    return await PostModel.findById(id)
      .populate({
        path: 'authorId',
        select: 'name email profileImage bio',
      })
      .lean();
  },

  async update(id: string, data: Partial<Post>) {
    return await PostModel.findByIdAndUpdate(id, data, {
      new: true,
    })
      .populate({
        path: 'authorId',
        select: 'name email profileImage bio',
      })
      .lean();
  },

  async findByCategory(category: string) {
    return await PostModel.find({ category })
      .populate({
        path: 'authorId',
        select: 'name email profileImage',
      })
      .sort({ createdAt: -1 })
      .lean();
  },

  async delete(id: string) {
    return await PostModel.findByIdAndDelete(id);
  },
};
