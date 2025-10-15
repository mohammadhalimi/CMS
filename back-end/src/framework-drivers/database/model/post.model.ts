import { Schema, model, Document } from 'mongoose';
import { Post } from '../../../entities/post.entity';

export interface PostDocument extends Omit<Post, 'id'>, Document {}

const postSchema = new Schema<PostDocument>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    authorId: { type: String, required: true },
    tags: { type: [String], default: [] },
    coverImage: { type: String },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const PostModel = model<PostDocument>('Post', postSchema);

