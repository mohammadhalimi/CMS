// src/entities/comment.entity.ts
import { Types } from 'mongoose';

export interface Comment {
  id?: string;
  postId: string | Types.ObjectId;    // ← می‌تواند string یا ObjectId باشد
  authorId: string | Types.ObjectId;  // ← می‌تواند string یا ObjectId باشد
  authorModel: 'Admin' | 'user';
  content: string;
  status?: 'pending' | 'approved' | 'rejected';
  createdAt?: Date;
}
