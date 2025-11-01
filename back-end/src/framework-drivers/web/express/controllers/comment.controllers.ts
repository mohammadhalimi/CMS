import { Request, Response } from 'express';
import { CommentUseCase } from '../../../../use-case/comments/comment.usecase';

export const CommentController = {
  // ایجاد کامنت جدید
  async create(req: Request, res: Response) {
    try {
      const { postId, content } = req.body;
      const { id: authorId, role } = (req as any).user; // فرض بر اینکه auth middleware داریم
      const authorModel = role === 'admin' ? 'Admin' : 'user';

      const comment = await CommentUseCase.createComment(postId, authorId, authorModel, content);
      res.status(201).json({ message: 'کامنت ارسال شد', data: comment });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  // دریافت کامنت‌های یک پست
  async getByPost(req: Request, res: Response) {
    try {
      const { postId } = req.params;
      const comments = await CommentUseCase.getCommentsByPost(postId);
      res.status(200).json({ data: comments });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  // دریافت کامنت‌های در انتظار (فقط برای ادمین)
  async getPending(req: Request, res: Response) {
    try {
      const comments = await CommentUseCase.getPendingComments();
      res.status(200).json({ data: comments });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  // تأیید کامنت
  async approve(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const comment = await CommentUseCase.approveComment(id);
      res.status(200).json({ message: 'کامنت تأیید شد', data: comment });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  // رد کردن کامنت
  async reject(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const comment = await CommentUseCase.rejectComment(id);
      res.status(200).json({ message: 'کامنت رد شد', data: comment });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },
};
