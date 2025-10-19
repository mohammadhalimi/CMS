import { PostRepository } from '../../interface-adapters/repositories/post.repositories';

export const getPostById = async (id: string) => {
  const post = await PostRepository.findById(id);
  return post;
};
