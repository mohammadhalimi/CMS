import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Post } from './types/post';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post._id}`}>
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.coverImage || '/default-image.jpg'}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all" />
          <div className="absolute top-3 left-3">
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                post.status === 'published'
                  ? 'bg-green-500/90 text-white'
                  : 'bg-yellow-500/90 text-white'
              }`}
            >
              {post.status === 'published' ? 'منتشر شده' : 'پیش‌نویس'}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-white font-bold text-lg mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-300 text-sm mb-4 line-clamp-3">
            {truncateContent(post.content, 120)}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-400 border-t border-white/10 pt-3">
            <div className="flex items-center space-x-1 space-x-reverse">
              <Calendar size={14} />
              <span>
                {post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString('fa-IR')
                  : 'تاریخ نامشخص'}
              </span>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-slate-700/50 text-gray-300 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function truncateContent(content: string, maxLength: number): string {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength) + '...';
}
