import React from 'react';
import FaqTable from "@/app/(panel)/panel/faq/columns";

const Page = () => {
    return (
        <div>
            <h2 className={"text-xl font-bold mb-3 lg:text-2xl"}>سوالات متداول</h2>
                <FaqTable/>
        </div>
    );
};

export default Page;