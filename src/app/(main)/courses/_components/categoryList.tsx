'use client'

import React from "react";
import Category from "./category";

const CategoryList = ({ categories,type }: {type:string, categories: any }) => {
    return (
        <div className="mx-auto mb-5 mt-5" id="content">
            <div className="text-lg font-bold mb-2">دسته بندی ها</div>
            <div className="flex overflow-x-auto lg:grid lg:grid-cols-6 xl:grid-cols-8 gap-x-2.5 mb-2.5 pb-2">
                {categories.map((data: any, index: number) => (
                    <Category type={type} {...data} key={index} />
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
