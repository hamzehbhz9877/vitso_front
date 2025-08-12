import React from 'react';
import TransActions from "@/app/(main)/(userPanel)/profile/wallet/_components/transActions";

const Page = () => {
    return (
        <div className={"wallet"}>
            <h2 className={"text-xl font-bold mb-3 px-2"}>کیف پول</h2>
            <TransActions />
        </div>
    );
};

export default Page;