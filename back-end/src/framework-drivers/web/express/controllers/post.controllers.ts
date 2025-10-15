import { Request, Response } from 'express';
import { createPost } from '../../../../use-case/post/create-post.usecase';
import { getAllPosts } from '../../../../use-case/post/get-all-posts.usecase';

export const PostController = {
  async create(req: Request, res: Response) {
    try {
      const { title, content, tags, status } = req.body;
      const authorId = (req as any).admin.id; // از توکن ادمین میاد

      const coverImage = req.file
        ? `/uploads/posts/${req.file.filename}`
        : undefined; // 👈 به جای null بنویس undefined

      const post = await createPost({
        title,
        content,
        tags,
        status,
        authorId,
        coverImage,
      });

      res.status(201).json({
        message: 'پست با موفقیت ایجاد شد',
        data: post,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const posts = await getAllPosts();
      res.status(200).json({ data: posts });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },
};

