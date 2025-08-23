import React from 'react';
import BreadCrumb from "@/components/breadcrumb/breadCrumb";
import {ArticleDetail} from "@/services/Article";
import ArticleDetails from "@/app/(main)/article/_components/articleDetails";
import {GetAllFaqForCourseOrArticle} from "@/services/Home";

const Page = async ({params}:any) => {

    const { id } = await params; // ✅ اول await میکنیم

    const articleDetails: any = await ArticleDetail({slug: id})
    const faqs: any = await GetAllFaqForCourseOrArticle(articleDetails.data?.id)
    return (
        <div className={"article-page container"}>
            <BreadCrumb data={[
                {
                    url: "/articles",
                    title: "مقاله"
                }, {
                    url: "",
                    title: articleDetails.data.title
                }
            ]}/>

            <ArticleDetails {...articleDetails.data} faqs={faqs.data?.listFaq}/>
        </div>
    );
};

export default Page;