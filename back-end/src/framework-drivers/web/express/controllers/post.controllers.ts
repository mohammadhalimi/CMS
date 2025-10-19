import { Request, Response } from 'express';
import { createPost } from '../../../../use-case/post/create-post.usecase';
import { getAllPosts } from '../../../../use-case/post/get-all-posts.usecase';
import { getPostById } from '../../../../use-case/post/get-post-by-id.usecase';
import { getPostsByCategory } from '../../../../use-case/post/get-posts-by-category.usecase';

export const PostController = {
  // ✅ ایجاد پست جدید
  async create(req: Request, res: Response) {
    try {
      const { title, content, tags, status, category } = req.body;

      // 🧠 تشخیص نویسنده از نوع کاربر یا ادمین
      const authorId = (req as any).admin?.id || (req as any).user?.id;
      const authorModel = (req as any).admin ? 'Admin' : 'user';

      if (!authorId) {
        return res.status(401).json({
          message: 'کاربر یا ادمین احراز هویت نشده است.',
        });
      }

      // 📸 اگر فایل تصویر آپلود شده بود
      const coverImage = req.file
        ? `/uploads/posts/${req.file.filename}`
        : undefined;

      // ✅ ساخت پست جدید
      const post = await createPost({
        title,
        content,
        tags,
        category,
        status,
        authorId,
        authorModel, // 👈 فقط این لازم است
        coverImage,
      });

      res.status(201).json({
        message: 'پست با موفقیت ایجاد شد ✅',
        data: post,
      });
    } catch (error: any) {
      console.error('Error creating post:', error);
      res.status(400).json({ message: error.message });
    }
  },

  // ✅ دریافت همه پست‌ها
  async getAll(req: Request, res: Response) {
    try {
      const posts = await getAllPosts();
      res.status(200).json({ data: posts });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // ✅ دریافت یک پست خاص
  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const post = await getPostById(id);

      if (!post) {
        return res.status(404).json({ message: 'پست مورد نظر یافت نشد' });
      }

      res.status(200).json({ data: post });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  // ✅ دریافت پست‌های یک دسته‌بندی خاص
  async getByCategory(req: Request, res: Response) {
    try {
      const { category } = req.params;
      const posts = await getPostsByCategory(category);
      res.status(200).json({ data: posts });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
};
