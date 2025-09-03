import React from 'react';
import BannerTable from "@/app/(panel)/panel/banner/columns";

const Page = () => {
    return (
        <div>
            <h2 className={"text-xl font-bold mb-3 lg:text-2xl"}>بنر ها</h2>
                <BannerTable/>
        </div>
    );
};

export default Page;