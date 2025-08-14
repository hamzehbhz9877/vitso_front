import React from 'react';
import InvoiceTable from "@/app/(panel)/panel/invoice/columns";

const Page = () => {
    return (
        <div className={"invoice"}>
            <h2 className={"text-xl font-bold mb-3 lg:text-2xl"}>فاکتور ها</h2>
            <InvoiceTable/>
        </div>
    );
};

export default Page;