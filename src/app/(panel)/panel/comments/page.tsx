import React from 'react';
import CommentsTable from "@/app/(panel)/panel/comments/columns";

const Page = () => {
    return (
        <div className={"comments"}>
            <h2 className={"text-xl font-bold mb-3 lg:text-2xl"}>مدیریت نظرات</h2>
            <CommentsTable/>
        </div>
    );
};

export default Page;