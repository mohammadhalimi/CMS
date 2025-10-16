export function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">لیست مدیران</h1>
        <div className="h-10 w-40 bg-slate-700 rounded-lg animate-pulse"></div>
      </div>
      
      {/* اسکلت پروفایل */}
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 w-32 bg-slate-700 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-slate-700 rounded-lg animate-pulse"></div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* اسکلت عکس پروفایل */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-24 h-24 bg-slate-700 rounded-2xl animate-pulse"></div>
          </div>
          
          {/* اسکلت اطلاعات */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-3 space-x-reverse p-3 bg-slate-700/30 rounded-lg border border-slate-600/50">
                <div className="w-8 h-8 bg-slate-700 rounded-md animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-16 bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-slate-700 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* اسکلت جدول */}
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-white/10 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-700 rounded w-3/4"></div>
          <div className="h-4 bg-slate-700 rounded w-1/2"></div>
          <div className="h-4 bg-slate-700 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
}