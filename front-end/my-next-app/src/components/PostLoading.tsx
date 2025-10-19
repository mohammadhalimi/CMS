// components/PostLoading.tsx
export function PostLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="animate-pulse">
        {/* دکمه بازگشت */}
        <div className="h-6 bg-slate-700 rounded w-32 mb-8"></div>
        
        {/* هدر پست */}
        <div className="text-center mb-8">
          <div className="h-4 bg-slate-700 rounded w-24 mx-auto mb-4"></div>
          <div className="h-8 bg-slate-700 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-slate-700 rounded w-1/2 mx-auto"></div>
        </div>
        
        {/* تصویر */}
        <div className="h-80 bg-slate-700 rounded-xl mb-8"></div>
        
        {/* محتوا */}
        <div className="space-y-4">
          <div className="h-4 bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-700 rounded w-2/3"></div>
          <div className="h-4 bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-700 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );
}