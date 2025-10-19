import { PostRepository } from '../../interface-adapters/repositories/post.repositories';

export const getPostsByCategory = async (category: string) => {
  const posts = await PostRepository.findByCategory( category );
  return posts;
};
