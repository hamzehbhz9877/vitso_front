import React from 'react';
import Profile from "@/app/(panel)/panel/info/_components/profile";

const Page = () => {
    return (
        <div className="profile container">
            <h2 className={"text-xl font-bold mb-3 lg:text-2xl"}>حساب کاربری</h2>
            <Profile/>
        </div>
    );
};

export default Page;