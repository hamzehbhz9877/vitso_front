

import React from 'react';
import Columns from "@/app/(panel)/panel/category/course/columns";

const Page = () => {



    return (
        <div className={"course-category"}>
            <h2 className={"text-xl font-bold mb-3 lg:text-2xl"}>دسته بندی دوره ها</h2>
            <Columns/>
        </div>
    );
};

export default Page;