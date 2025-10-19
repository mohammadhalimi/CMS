import { Schema, model, Document, Types } from 'mongoose';
import { Post } from '../../../entities/post.entity';

// 👇 نوع اصلاح‌شده
export interface PostDocument extends Omit<Post, 'id' | 'authorId'>, Document {
  authorId: Types.ObjectId; // ✅ نوع باید ObjectId باشه، نه string
  authorModel: 'Admin' | 'user'; // مدل نویسنده (دینامیک)
}

const postSchema = new Schema<PostDocument>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },

    // ✅ تعریف درست refPath با ObjectId
    authorId: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: 'authorModel',
    },

    authorModel: {
      type: String,
      required: true,
      enum: ['Admin', 'user'],
    },

    tags: { type: [String], default: [] },
    category: { type: String },
    coverImage: { type: String },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  }
);

export const PostModel = model<PostDocument>('Post', postSchema);
