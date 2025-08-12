import React from 'react';
import BreadCrumb from "@/components/breadcrumb/breadCrumb";
import {ArticleDetail} from "@/services/Article";
import ArticleDetails from "@/app/(main)/article/_components/articleDetails";

const Page = async ({params}:any) => {


    const articleDetails: any = await ArticleDetail({slug: params?.id})

    return (
        <div className={"article-page container"}>
            <BreadCrumb data={[
                {
                    url: "/blog",
                    title: "دوره"
                }, {
                    url: "",
                    title: articleDetails.data.title
                }
            ]}/>

            <ArticleDetails {...articleDetails.data}/>
        </div>
    );
};

export default Page;