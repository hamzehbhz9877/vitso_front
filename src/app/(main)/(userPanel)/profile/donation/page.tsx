import React from 'react';
import DonationTable from "./_components/columns";

const Page = () => {
    return (
        <div className={"donation"}>
            <h2 className={"text-xl font-bold mb-3 px-2"}>دونیت</h2>
            <DonationTable/>
        </div>
    );
};

export default Page;