

import React from 'react';
import Columns from "@/app/(panel)/panel/courses/columns";

const Page = () => {


    return (
        <div className={"courses"}>
            <h2 className={"text-xl font-bold mb-3 lg:text-2xl"}>مدیریت دوره ها</h2>
            <Columns/>
        </div>
    );
};

export default Page;