import React from 'react';
import AuthorProfile from "@/app/(main)/author/_components/authorProfile";
import {GetTeacherInfo} from "@/services/Teacher";

const Page = async ({params}) => {

    const author=await GetTeacherInfo(params.id)

    return (
        <div className="author-profile">
          <AuthorProfile teacher={author.data}/>
        </div>
    );
};

export default Page;