import { CommentModel } from '../../framework-drivers/database/model/comment.model';
import { Types } from 'mongoose';

export const CommentUseCase = {
  // 🟢 ایجاد کامنت جدید
  async createComment(postId: string, authorId: string, authorModel: 'Admin' | 'user', content: string) {
    const comment = new CommentModel({
      postId,
      authorId,
      authorModel,
      content,
      status: authorModel === 'Admin' ? 'approved' : 'pending', // ادمین مستقیماً تأیید می‌شود
    });
    await comment.save();
    return comment;
  },

  // 🔵 دریافت کامنت‌های تأیید شده‌ی هر پست
  async getCommentsByPost(postId: string) {
    const _id = new Types.ObjectId(postId);
    const comments = await CommentModel.find({ postId: _id, status: 'approved' })
      .populate('author', 'name profileImage email')
      .sort({ createdAt: -1 })
      .lean();
    return comments;
  },

  // 🟣 دریافت کامنت‌های در انتظار تأیید (برای پنل ادمین)
  async getPendingComments() {
    return await CommentModel.find({ status: 'pending' })
      .populate('author', 'name email')
      .populate('postId', 'title')
      .sort({ createdAt: -1 })
      .lean();
  },

  // 🟡 تأیید کامنت
  async approveComment(id: string) {
    return await CommentModel.findByIdAndUpdate(id, { status: 'approved' }, { new: true });
  },

  // 🔴 رد کردن کامنت
  async rejectComment(id: string) {
    return await CommentModel.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });
  },
};
