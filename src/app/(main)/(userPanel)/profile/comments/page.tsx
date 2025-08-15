import React from 'react';
import Comments from "@/app/(main)/(userPanel)/profile/comments/_components/comments";

const Page = () => {
    return (
        <div className={"comments-user"} id={"comments"}>
            <h2 className={"text-xl font-bold mb-3 px-2"}>کامنت ها</h2>
            <Comments/>
        </div>
    );
};

export default Page;