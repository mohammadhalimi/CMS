import { PostRepository } from '../../interface-adapters/repositories/post.repositories';

export const getAllPosts = async () => {
  return await PostRepository.findAll();
};
