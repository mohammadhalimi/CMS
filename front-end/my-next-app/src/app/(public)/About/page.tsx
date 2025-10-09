import TeamMember from '@/components/TeamMember';
import StatCard from '@/components/Statcard';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      <section className="container mx-auto px-6 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            داستان <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">محتواپلاس</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-8">
            ما تیمی از عاشقان تکنولوژی هستیم که باور داریم مدیریت محتوا باید ساده، 
            قدرتمند و لذت‌بخش باشد. مأموریت ما ایجاد ابزارهایی است که به کسب‌وکارها 
            کمک می‌کند داستان خود را به بهترین شکل روایت کنند.
          </p>
        </div>
      </section>
      <section className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">ماموریت ما</h2>
            <p className="text-gray-300 leading-7">
              ایجاد پلتفرمی قدرتمند و در عین حال ساده برای مدیریت محتوا که به کسب‌وکارها 
              امکان می‌دهد بدون پیچیدگی‌های فنی، محتوای خود را خلق و مدیریت کنند.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl mb-6 flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">چشم‌انداز</h2>
            <p className="text-gray-300 leading-7">
              تبدیل شدن به پیشروترین پلتفرم مدیریت محتوای فارسی‌زبان که استانداردهای 
              جهانی را با نیازهای بازار ایران ترکیب می‌کند.
            </p>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard number="۵۰۰+" label="پروژه موفق" />
          <StatCard number="۹۹.۹٪" label="رضایت کاربران" />
          <StatCard number="۲۴/۷" label="پشتیبانی" />
          <StatCard number="۳+" label="سال تجربه" />
        </div>
      </section>
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">ارزش‌های ما</h2>
          <p className="text-gray-300">اصولی که هر روز با آن زندگی می‌کنیم</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {valuesData.map((value, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all group">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg mb-4 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
              <p className="text-gray-300 text-sm leading-6">{value.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">تیم ما</h2>
          <p className="text-gray-300">افرادی که این سفر را ممکن ساختند</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamData.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </section>
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">سفر ما</h2>
          <p className="text-gray-300">از ابتدا تا امروز</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {timelineData.map((item, index) => (
            <div key={index} className="flex items-start space-x-4 space-x-reverse mb-8 last:mb-0">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-white">{item.year}</h3>
                  <span className="text-blue-400 text-sm bg-blue-500/20 px-3 py-1 rounded-full">
                    {item.phase}
                  </span>
                </div>
                <p className="text-gray-300 leading-7">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const valuesData = [
  {
    icon: "🚀",
    title: "نوآوری",
    description: "همیشه در جستجوی راه‌های جدید و خلاقانه برای حل مشکلات هستیم."
  },
  {
    icon: "💎",
    title: "کیفیت",
    description: "به کیفیت کد، طراحی و تجربه کاربری تعهد کامل داریم."
  },
  {
    icon: "🤝",
    title: "همکاری",
    description: "با تیم‌ها و مشتریان خود مانند شرکای تجاری رفتار می‌کنیم."
  },
  {
    icon: "📈",
    title: "رشد",
    description: "همواره در حال یادگیری و بهبود خود و محصولاتمان هستیم."
  },
  {
    icon: "🎯",
    title: "تمرکز",
    description: "بر روی اهداف اصلی متمرکز می‌مانیم و حواس‌پرتی نمی‌پذیریم."
  },
  {
    icon: "❤️",
    title: "اشتیاق",
    description: "عاشق کاری هستیم که انجام می‌دهیم و این در کارمان نمایان است."
  }
];

const teamData = [
  {
    name: "محمد حلیمی",
    role: "بنیان‌گذار و مدیر فنی",
    image: "/images/team/ali.jpg",
    description: "با ۱۰ سال تجربه در توسعه نرم‌افزار و عاشق چالش‌های فنی.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    }
  },
  {
    name: "محمد تقی پور",
    role: "توسعه‌دهنده فرانت‌اند",
    image: "/images/team/sara.jpg",
    description: "متخصص در React و Next.js، عاشق ایجاد تجربیات کاربری زیبا.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    }
  },
  {
    name: "مهدی کارگر",
    role: "توسعه‌دهنده بک‌اند",
    image: "/images/team/reza.jpg",
    description: "کارشناس معماری نرم‌افزار و سیستم‌های توزیع‌شده.",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    }
  }
];

const timelineData = [
  {
    year: "۱۴۰۰",
    phase: "شروع",
    description: "ایده اولیه با هدف ایجاد یک سیستم مدیریت محتوای مدرن برای بازار ایران شکل گرفت."
  },
  {
    year: "۱۴۰۱",
    phase: "توسعه",
    description: "تیم تشکیل شد و اولین نسخه MVP با معماری مدرن توسعه داده شد."
  },
  {
    year: "۱۴۰۲",
    phase: "راه‌اندازی",
    description: "اولین نسخه عمومی منتشر شد و با استقبال خوب کاربران روبرو شد."
  },
  {
    year: "اکنون",
    phase: "رشد",
    description: "در حال توسعه ویژگی‌های جدید و بهبود مستمر پلتفرم هستیم."
  }
];