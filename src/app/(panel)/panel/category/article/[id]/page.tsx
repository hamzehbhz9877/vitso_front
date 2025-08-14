

import React from 'react';
import Columns from "@/app/(panel)/panel/category/[id]/columns";

const Page = () => {



    return (
        <div className={"sub-article-category"}>
            <h2 className={"text-xl font-bold mb-3 lg:text-2xl"}>زیر دسته بندی مقاله ها</h2>
            <Columns/>
        </div>
    );
};

export default Page;