import React from "react";
import parse from "html-react-parser";
import { GetAboutUs } from "@/services/AboutUs";
import Image from "next/image";
import Link from "next/link";
import CountUp from "@/components/countUp";

const Page = async () => {
    const aboutus = await GetAboutUs();

    return (
        <main className="aboutUs container mx-auto px-4 py-12 space-y-16">
            <section className="prose max-w-none text-center mx-auto">
                {parse(aboutus.data.content??'')}
            </section>

            {/*/!* اهداف آموزشی *!/*/}
            {/*<section className="text-center">*/}
            {/*    <h2 className="text-3xl font-bold mb-6">اهداف آموزشی ما</h2>*/}
            {/*    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">*/}
            {/*        ما تلاش می‌کنیم با تولید محتوای آموزشی باکیفیت و به‌روز، یادگیری را برای*/}
            {/*        همه آسان‌تر، سریع‌تر و کاربردی‌تر کنیم.*/}
            {/*    </p>*/}
            {/*    <div className="grid md:grid-cols-3 gap-6">*/}
            {/*        {[*/}
            {/*            "دوره‌های تخصصی با مدرسین حرفه‌ای",*/}
            {/*            "منابع رایگان و پشتیبانی همیشگی",*/}
            {/*            "ایجاد مسیر یادگیری شخصی‌سازی‌شده",*/}
            {/*        ].map((goal, i) => (*/}
            {/*            <div*/}
            {/*                key={i}*/}
            {/*                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow"*/}
            {/*            >*/}
            {/*                <p className="font-medium">{goal}</p>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</section>*/}

            {/*/!* بخش CountUp *!/*/}

            {/*<section className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-10 text-center">*/}
            {/*    <h2 className="text-3xl font-bold mb-8">دستاوردهای ما</h2>*/}
            {/*    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">*/}
            {/*        <div>*/}
            {/*            <p className="text-4xl font-extrabold text-primary-600">*/}
            {/*                <CountUp end={120} suffix="+" />*/}
            {/*            </p>*/}
            {/*            <p className="mt-2 text-gray-600 dark:text-gray-300">دوره آموزشی</p>*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <p className="text-4xl font-extrabold text-primary-600">*/}
            {/*                <CountUp end={15000} suffix="+" />*/}
            {/*            </p>*/}
            {/*            <p className="mt-2 text-gray-600 dark:text-gray-300">دانشجو فعال</p>*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <p className="text-4xl font-extrabold text-primary-600">*/}
            {/*                <CountUp end={40} suffix="+" />*/}
            {/*            </p>*/}
            {/*            <p className="mt-2 text-gray-600 dark:text-gray-300">مدرس برتر</p>*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            <p className="text-4xl font-extrabold text-primary-600">*/}
            {/*                <CountUp end={98} suffix="%" />*/}
            {/*            </p>*/}
            {/*            <p className="mt-2 text-gray-600 dark:text-gray-300">رضایت دانشجویان</p>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}


            {/*/!* مدرسین *!/*/}
            {/*<section>*/}
            {/*    <h2 className="text-3xl font-bold mb-8 text-center">مدرسین ما</h2>*/}
            {/*    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">*/}
            {/*        {[*/}
            {/*            { name: "دکتر محمدی", role: "مدرس هوش مصنوعی", img: "https://randomuser.me/api/portraits/men/32.jpg" },*/}
            {/*            { name: "مهندس احمدی", role: "مدرس برنامه‌نویسی وب", img: "https://randomuser.me/api/portraits/men/44.jpg" },*/}
            {/*            { name: "خانم رضایی", role: "مدرس طراحی UI/UX", img: "https://randomuser.me/api/portraits/women/65.jpg" },*/}
            {/*        ].map((teacher, i) => (*/}
            {/*            <div*/}
            {/*                key={i}*/}
            {/*                className="text-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 shadow"*/}
            {/*            >*/}
            {/*                <Image*/}
            {/*                    src={teacher.img}*/}
            {/*                    alt={teacher.name}*/}
            {/*                    width={150}*/}
            {/*                    height={150}*/}
            {/*                    className="mx-auto rounded-full"*/}
            {/*                />*/}
            {/*                <h3 className="mt-4 font-semibold">{teacher.name}</h3>*/}
            {/*                <p className="text-sm text-gray-600 dark:text-gray-400">{teacher.role}</p>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</section>*/}

            {/* CTA */}
            {/*<section className="bg-primary-600 dark:bg-primary-800 text-white text-center rounded-2xl p-12">*/}
            {/*    <h2 className="text-2xl font-bold mb-4">شروع مسیر یادگیری شما</h2>*/}
            {/*    <p className="mb-6">*/}
            {/*        همین امروز به جمع هزاران دانشجو بپیوندید و یادگیری رو شروع کنید.*/}
            {/*    </p>*/}
            {/*    <Link href="/courses" className="btn btn-primary">*/}
            {/*        مشاهده دوره‌ها*/}
            {/*    </Link>*/}
            {/*</section>*/}
        </main>
    );
};

export default Page;
