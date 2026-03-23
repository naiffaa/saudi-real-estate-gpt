"use client";

import Link from "next/link";
import { Home as HomeIcon } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      {/* 🔝 Navbar */}
      <header className="site-header">
        <div className="container-shell px-4 py-4 flex items-center justify-between">
          
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#5f7f59] rounded-xl flex items-center justify-center text-white">
              <HomeIcon className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-[#5f7f59]">مكاني</h1>
          </Link>

          {/* نفس الناف بار */}
 <nav className="flex items-center">
            <div className="flex items-center gap-4 bg-white/70 backdrop-blur-md border border-[#d7ddd7] rounded-full px-30 py-50 shadow-sm">
              
              <Link
                href="/"
                className="px-6 py-2 rounded-full text-[#5f7f59] font-bold hover:bg-[#5f7f59] hover:text-[#d7ddd7] transition-all duration-200"
              >
                الرئيسية
              </Link>

              <Link
                href="/about"
                className="px-6 py-2 rounded-full text-[#7a877c] font-medium hover:bg-[#5f7f59] hover:text-[#d7ddd7] transition-all duration-200"
              >
                عن مكاني
              </Link>

            </div>
          </nav>

        </div>
      </header>

      {/* 📄 محتوى الصفحة */}
      <main className="py-20">
        <div className="container-shell px-4">

          {/* العنوان */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#5f7f59] mb-4">
              وش سالفة مكاني؟
            </h2>
            <p className="text-[#7a877c] text-lg max-w-2xl mx-auto">
              مكاني مو مجرد موقع عقار… مكاني تجربة ذكية تخليك توصل لعقارك بأسهل طريقة ممكنة.
            </p>
          </div>

          {/* الكارد */}
          <div className="glass-card rounded-[28px] p-8 max-w-3xl mx-auto text-center leading-8 text-[#243b2c]">
            <p className="mb-6">
              مكاني هو فكرة طلعت عشان تسهّل على الناس تلقى بيوتهم وأراضيهم بطريقة بسيطة،
              بدون تعقيد وبدون ما تضيع بين آلاف الإعلانات.
            </p>

            <p className="mb-6">
              بدل ما تبحث بطريقة تقليدية، تقدر تكتب طلبك بلهجتك العادية مثل:
              "أبي فيلا في الرياض حي النرجس"
              ومكاني يفهمك ويجيب لك النتائج المناسبة مباشرة.
            </p>

            <p>
              المشروع مبني باستخدام الذكاء الاصطناعي لغرض تطوير مهاراتي واتمام مشروع LLMs             </p>
          </div>

          {/* كروت تحت */}
          <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
            
            <div className="glass-card rounded-3xl p-6 text-center">
              <h3 className="text-xl font-bold text-[#5f7f59] mb-2">سهولة الاستخدام</h3>
              <p className="text-[#7a877c]">
                تكتب طلبك بطريقتك… ومكاني يفهمك بدون تعقيد.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-6 text-center">
              <h3 className="text-xl font-bold text-[#5f7f59] mb-2">ذكاء اصطناعي</h3>
              <p className="text-[#7a877c]">
                تحليل ذكي لطلبك وربطه مع البيانات لإعطائك أفضل النتائج.
              </p>
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-10 text-center text-[#7a877c] border-t border-[#d7ddd7]">
        <h2 className="text-xl font-bold text-[#5f7f59] mb-2">مكاني</h2>
        <p> Made by Naifa Alarifi</p>
        <p className="mt-3 text-sm">SDAIA - LLMs from scrach program</p>
      </footer>
    </>
  );
}