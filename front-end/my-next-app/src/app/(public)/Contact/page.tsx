import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            در <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">تماس</span> باشید
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-8">
            ما مشتاق شنیدن نظرات، پیشنهادات و سوالات شما هستیم. 
            تیم پشتیبانی ما همیشه آماده پاسخگویی به شماست.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">اطلاعات تماس</h2>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">ایمیل</h3>
                    <p className="text-gray-300">support@contentplus.ir</p>
                    <p className="text-gray-400 text-sm">پاسخگویی در 24 ساعت</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">تلفن</h3>
                    <p className="text-gray-300">021-12345678</p>
                    <p className="text-gray-400 text-sm">شنبه تا چهارشنبه 9-17</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">آدرس</h3>
                    <p className="text-gray-300">تهران، خیابان ولیعصر، پلاک 1000</p>
                    <p className="text-gray-400 text-sm">دفتر مرکزی</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6">شبکه‌های اجتماعی</h2>
              <div className="flex space-x-4 space-x-reverse">
                <a href="#" className="w-12 h-12 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg flex items-center justify-center transition-all">
                  <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 rounded-lg flex items-center justify-center transition-all">
                  <svg className="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.017 12.014 0 12.017 0z"/>
                  </svg>
                </a>
                <a href="#" className="w-12 h-12 bg-blue-400/20 hover:bg-blue-400/30 border border-blue-400/30 rounded-lg flex items-center justify-center transition-all">
                  <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">پیام به ما</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">سوالات متداول</h2>
          <p className="text-gray-300">پاسخ سوالات پرتکرار خود را اینجا پیدا کنید</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
              <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
              <p className="text-gray-300 text-sm leading-6">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// داده‌های سوالات متداول
const faqData = [
  {
    question: "چگونه می‌توانم اکانت ایجاد کنم؟",
    answer: "روی دکمه 'شروع کنید' در صفحه اصلی کلیک کنید و فرم ثبت‌نام را پر کنید."
  },
  {
    question: "آیا می‌توانم پست‌های قدیمی را ویرایش کنم؟",
    answer: "بله، در داشبورد مدیریت به بخش پست‌ها رفته و پست مورد نظر را ویرایش کنید."
  },
  {
    question: "پشتیبانی چه ساعاتی پاسخگو است؟",
    answer: "پشتیبانی از شنبه تا چهارشنبه از ساعت 9 تا 17 پاسخگوی شماست."
  },
  {
    question: "آیا امکان سفارشی‌سازی قالب وجود دارد؟",
    answer: "بله، در نسخه پریمیوم امکان سفارشی‌سازی کامل قالب را دارید."
  }
];