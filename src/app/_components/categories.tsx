import React from 'react';
import Image from "next/image";

const Categories = ({data}:{data:Category[]}) => {
    return (
        <section className={"search-course"} id={"search-course"}>
            <div className="w-full flex flex-col gap-1.5">
                <h4 className="font-bold text-xl">چی میخوای یاد
                    بگیری؟</h4>
                <p>دسته‌بندی‌های آموزشی ویتسو رو ببین و از جایی شروع کن که برات جذابه.</p></div>
            <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-5 text-sm mt-5">

                {data.map((category, index) => (
                    <a key={index}
                       className={"flex cursor-pointer flex-col text-xs lg:text-sm text-center w-full items-center\n" +
                           "         p-5 rounded-3xl justify-center h-[100px] block gap-2 border border-base-content/10\n" +
                           "         hover:bg-c-primary hover:text-primary-content transition-colors duration-300"}>
                        {category.icon!==null?<Image src={category.icon} alt={category.name} width={30} height={30} />:""}
                        {category.name}
                    </a>
                ))}
            </div>
        </section>
    );
};

export default Categories;