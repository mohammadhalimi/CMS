const Features = () => {
    return(
        <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          چرا <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">محتوا پلاس</span>؟
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-6 flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">سریع و بهینه</h3>
            <p className="text-gray-400 leading-7">
              ساخته شده با Next.js 14 برای عملکرد فوق‌العاده و سئوی بی‌نظیر
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full mb-6 flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">امن و مطمئن</h3>
            <p className="text-gray-400 leading-7">
              امنیت در سطح سازمانی با احراز هویت JWT و مدیریت دسترسی مبتنی بر نقش
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-6 flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">تکنولوژی روز</h3>
            <p className="text-gray-400 leading-7">
              Next.js، Node.js، MongoDB و Tailwind CSS برای بنیانی آینده‌نگر
            </p>
          </div>
        </div>
      </section>
    )
}

export default Features