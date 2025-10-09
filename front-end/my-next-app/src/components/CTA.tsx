import Link from "next/link";

const CTA = () => {
    return (
             <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            آماده شروع هستید؟
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            همین حالا به جامعه ما بپیوندید و تجربه مدیریت محتوای مدرن را احساس کنید
          </p>
          <Link
            href="/auth/register"
            className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-xl font-semibold hover:shadow-2xl transition-all transform hover:scale-105 text-lg"
          >
            🚀 ثبت‌نام رایگان
          </Link>
        </div>
      </section>
    )
}

export default CTA;