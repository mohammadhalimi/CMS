import { PostRepository } from '../../interface-adapters/repositories/post.repositories';
import { Post } from '../../entities/post.entity';

export const createPost = async (post: Post) => {
  if (!post.title || !post.content) {
    throw new Error('Title and content are required');
  }

  const newPost = await PostRepository.create({
    ...post,
    status: post.status || 'draft',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return newPost;
};

