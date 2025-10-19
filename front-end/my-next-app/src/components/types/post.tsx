// types/post.ts
export interface Post {
  id?: string;
  _id?: string;
  title: string;
  content: string;
  category?: string;
  authorId: string;
  tags?: string[];
  coverImage?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  status?: 'draft' | 'published';
  __v?: number; // اضافه کردن فیلد نسخه‌بندی mongoose
}