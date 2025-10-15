export interface Post {
  id?: string;
  title: string;
  content: string;
  authorId: string;  // شناسه ادمینی که پست رو نوشته
  tags?: string[];
  coverImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
  status?: 'draft' | 'published'; // حالت انتشار
}
