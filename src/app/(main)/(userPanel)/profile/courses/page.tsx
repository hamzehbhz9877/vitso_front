import React from 'react';
import Courses from "@/app/(main)/(userPanel)/profile/courses/_components/courses";

const Page = () => {
    return (
        <div>
            <h2 className={"text-xl font-bold mb-3 px-2"}>دوره های من</h2>
            <Courses/>
        </div>
    );
};

export default Page;