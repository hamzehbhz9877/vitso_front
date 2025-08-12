import React from 'react';
import Invoices from "@/app/(main)/(userPanel)/profile/invoice/_components/invoices";

const Page = () => {
    return (
        <div className={"invoice"}>
            <h2 className={"text-xl font-bold mb-3 px-2"}>فاکتور ها</h2>
            <Invoices />
        </div>
    );
};

export default Page;