

import React from 'react';
import Columns from "@/app/(panel)/panel/article/columns";

const Page = () => {


    return (
        <div className={"articles"}>
            <h2 className={"text-xl font-bold mb-3 lg:text-2xl"}>مدیریت مقاله ها</h2>
            <Columns/>
        </div>
    );
};

export default Page;