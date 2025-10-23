// app/posts/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Clock, Eye, ArrowRight, Tag, Edit3, Share2, Mail, Shield } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getPost(id: string) {
  const res = await fetch(`${API_URL}/api/posts/${id}`, {
    cache: "no-store",
    next: { tags: [`post-${id}`] }
  });
  if (!res.ok) throw new Error("پست یافت نشد");
  return res.json();
}

interface PostDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetails({ params }: PostDetailsProps) {
  const { id } = await params;
  const postData = await getPost(id);
  const post = postData.data;

  // تابع برای فرمت کردن تاریخ
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // تابع برای محاسبه زمان مطالعه
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  // تابع برای گرفتن نام نویسنده
  const getAuthorName = () => {
    if (post.authorId && typeof post.authorId === 'object' && post.authorId.name) {
      return post.authorId.name;
    }
    return 'نویسنده';
  };

  // تابع برای گرفتن ایمیل نویسنده
  const getAuthorEmail = () => {
    if (post.authorId && typeof post.authorId === 'object' && post.authorId.email) {
      return post.authorId.email;
    }
    return 'ایمیل موجود نیست';
  };

  // تابع برای گرفتن عکس پروفایل نویسنده
  const getAuthorProfileImage = () => {
    if (post.authorId && typeof post.authorId === 'object' && post.authorId.profileImage) {
      return post.authorId.profileImage;
    }
    return null;
  };

  // تابع برای گرفتن حروف اول نام نویسنده
  const getAuthorInitials = () => {
    const name = getAuthorName();
    if (name === 'نویسنده') return 'ن';

    const words = name.split(' ');
    if (words.length === 1) {
      return words[0].charAt(0);
    } else {
      return words[0].charAt(0) + words[words.length - 1].charAt(0);
    }
  };

  // تابع برای نمایش authorModel
  const getAuthorModelText = () => {
    switch (post.authorModel) {
      case 'Admin':
        return 'مدیر';
      case 'User':
        return 'کاربر';
      case 'Editor':
        return 'ویرایشگر';
      default:
        return post.authorModel || 'نامشخص';
    }
  };

  // تابع برای رنگ authorModel
  const getAuthorModelColor = () => {
    switch (post.authorModel) {
      case 'Admin':
        return 'bg-red-500/20 text-red-300 border border-red-500/30';
      case 'User':
        return 'bg-blue-500/20 text-blue-300 border border-blue-500/30';
      case 'Editor':
        return 'bg-green-500/20 text-green-300 border border-green-500/30';
      default:
        return 'bg-slate-500/20 text-slate-300 border border-slate-500/30';
    }
  };

  const readingTime = calculateReadingTime(post.content);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8" dir="rtl">
      {/* دکمه بازگشت */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link
          href="/posts"
          className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors duration-300 group"
        >
          <ArrowRight className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
          <span>بازگشت به لیست پست‌ها</span>
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* هدر پست */}
        <header className="text-center mb-12">
          {/* وضعیت پست */}
          <div className="inline-flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-300 px-6 py-3 rounded-2xl text-sm font-medium mb-8">
            <div className={`w-3 h-3 rounded-full animate-pulse ${post.status === 'published' ? 'bg-green-500' : 'bg-yellow-500'
              }`}></div>
            {post.status === 'published' ? 'منتشر شده' : 'پیش نویس'}
            <div className="w-px h-4 bg-slate-600"></div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>۰ بازدید</span>
            </div>
          </div>

          {/* عنوان */}
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-8 leading-tight">
            {post.title}
          </h1>

          {/* متادیتا */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-slate-300 mb-8">
            {/* اطلاعات نویسنده */}
            <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-xl">
              {/* عکس پروفایل نویسنده */}
              <div className="relative">
                {getAuthorProfileImage() ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500/30">
                    <Image
                      src={getAuthorProfileImage()}
                      alt={getAuthorName()}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center border-2 border-purple-500/30">
                    <span className="text-white text-sm font-bold">
                      {getAuthorInitials()}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-400">نویسنده</div>
                <div className="text-sm font-medium">{getAuthorName()}</div>
                <div className={`text-xs mt-1 px-2 py-1 rounded-full inline-block ${getAuthorModelColor()}`}>
                  {getAuthorModelText()}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-xl">
              <Calendar className="w-5 h-5 text-blue-400" />
              <div className="text-right">
                <div className="text-xs text-slate-400">تاریخ انتشار</div>
                <div className="text-sm font-medium">{formatDate(post.createdAt)}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-xl">
              <Clock className="w-5 h-5 text-green-400" />
              <div className="text-right">
                <div className="text-xs text-slate-400">زمان مطالعه</div>
                <div className="text-sm font-medium">{readingTime} دقیقه</div>
              </div>
            </div>
          </div>
        </header>

        {/* تصویر کاور */}
        {post.coverImage && (
          <div className="relative w-full h-80 lg:h-96 mb-12 rounded-3xl overflow-hidden shadow-2xl group">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
          </div>
        )}

        {/* دکمه‌های اکشن */}
        <div className="flex justify-center gap-4 mb-8">
          <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/25">
            <Share2 className="w-4 h-4" />
            اشتراک گذاری
          </button>
          <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-300 px-6 py-3 rounded-xl transition-all duration-300 transform hover:-translate-y-1">
            <Edit3 className="w-4 h-4" />
            ویرایش پست
          </button>
        </div>

        {/* محتوای پست */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-8 mb-8 shadow-2xl">
          <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-300 prose-p:leading-8 prose-p:mb-6 prose-img:rounded-2xl prose-img:shadow-xl prose-strong:text-white prose-li:text-slate-300 prose-code:text-purple-300">
            <div className="text-lg leading-8 text-slate-300 whitespace-pre-line">
              {post.content}
            </div>
          </div>
        </div>

        {/* تگ‌ها */}
        {post.tags && post.tags.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-8 mb-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Tag className="w-6 h-6 text-purple-400" />
              <h3 className="text-xl font-bold text-white">تگ‌های پست</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 px-4 py-2 rounded-xl text-sm font-medium border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* اطلاعات پست */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-3xl border border-slate-700/50 p-8 shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
            اطلاعات فنی پست
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600/50 hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-blue-400" />
                <h4 className="text-white font-semibold">تاریخ ایجاد</h4>
              </div>
              <div className="text-slate-300 text-sm bg-slate-800/50 p-3 rounded-lg border border-slate-600/50">
                {formatDate(post.createdAt)}
              </div>
            </div>

            <div className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600/50 hover:border-green-500/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-green-400" />
                <h4 className="text-white font-semibold">آخرین بروزرسانی</h4>
              </div>
              <div className="text-slate-300 text-sm bg-slate-800/50 p-3 rounded-lg border border-slate-600/50">
                {formatDate(post.updatedAt)}
              </div>
            </div>

            <div className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600/50 hover:border-purple-500/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-5 h-5 text-purple-400" />
                <h4 className="text-white font-semibold">وضعیت انتشار</h4>
              </div>
              <div className={`text-sm font-medium px-4 py-2 rounded-lg inline-block ${post.status === 'published'
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                  : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                }`}>
                {post.status === 'published' ? 'منتشر شده' : 'پیش نویس'}
              </div>
            </div>

            {/* اطلاعات نویسنده */}
            <div className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600/50 hover:border-orange-500/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-5 h-5 text-orange-400" />
                <h4 className="text-white font-semibold">اطلاعات نویسنده</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-lg border border-slate-600/50">
                  {/* عکس پروفایل نویسنده در بخش اطلاعات فنی */}
                  <div className="relative">
                    {getAuthorProfileImage() ? (
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500/30">
                        <Image
                          src={getAuthorProfileImage()}
                          alt={getAuthorName()}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center border-2 border-purple-500/30">
                        <span className="text-white text-xs font-bold">
                          {getAuthorInitials()}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-slate-300 text-sm font-medium"><Link
                      href={`/Admin/${post.authorId._id || post.authorId}`}
                      className="text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors duration-200"
                    >
                      {getAuthorName()}
                    </Link>
                    </div>
                    <div className="text-slate-400 text-xs flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {getAuthorEmail()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-slate-800/50 p-3 rounded-lg border border-slate-600/50">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-400" />
                    <span className="text-slate-400 text-sm">نقش:</span>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ${getAuthorModelColor()}`}>
                    {getAuthorModelText()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* فوتر */}
        <footer className="text-center mt-12 pt-8 border-t border-slate-700/50">
          <p className="text-slate-400 text-sm">
            این پست در {formatDate(post.createdAt)} ایجاد شده و آخرین بار در {formatDate(post.updatedAt)} بروزرسانی شده است.
          </p>
        </footer>
      </article>
    </main>
  );
}