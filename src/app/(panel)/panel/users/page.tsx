

import React from 'react';
import Columns from "@/app/(panel)/panel/users/columns";

const Page = () => {



    return (
        <div className={"users"}>
            <h2 className={"text-xl font-bold mb-3 lg:text-2xl"}>مدیریت کاربران</h2>

            <Columns/>
        </div>

    );
};

export default Page;