import mongoose, { Schema, Document, Types } from 'mongoose';
import { Comment } from '../../../entities/comment.entity';

// برای جلوگیری از تداخل id
export interface CommentDocument extends Omit<Comment, 'id'>, Document {
  postId: Types.ObjectId;
  authorId: Types.ObjectId;
}

// اسکیمای کامنت
const commentSchema = new Schema<CommentDocument>({
  postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  authorId: { type: Schema.Types.ObjectId, required: true },
  authorModel: { type: String, enum: ['Admin', 'user'], required: true },
  content: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

// 🔹 وقتی کامنت رو populate می‌کنی، بر اساس authorModel تعیین می‌کنه از کدوم کالکشن بیاره
commentSchema.virtual('author', {
  ref: (doc: any) => doc.authorModel, // ← "Admin" یا "User"
  localField: 'authorId',
  foreignField: '_id',
  justOne: true,
});

// فعال کردن virtuals در خروجی JSON و Object
commentSchema.set('toObject', { virtuals: true });
commentSchema.set('toJSON', { virtuals: true });

export const CommentModel = mongoose.model<CommentDocument>('Comment', commentSchema);
