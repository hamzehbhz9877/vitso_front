import React from 'react';
import {CourseDetail} from "@/services/Course";
import CourseDetails from "@/app/(main)/course/_components/courseDetails";
import BreadCrumb from "@/components/breadcrumb/breadCrumb";
import {GetAllFaqForCourseOrArticle} from "@/services/Home";

const Page = async ({params}: any) => {


    const {id}=await params
    const courseDetails: any = await CourseDetail({slug: id})
    const faqs: any = await GetAllFaqForCourseOrArticle(courseDetails.data?.id)

    return (
        <div className={"course-page container"}>
            <BreadCrumb data={[
                {
                    url: "/courses",
                    title: "دوره"
                },
                {
                    url: `/courses?category=${courseDetails.data.categorySlug}`,
                    title: courseDetails.data.categoryName
                }, {
                    url: "",
                    title: courseDetails.data.title
                }
            ]}/>

            <CourseDetails {...courseDetails.data} faqs={faqs.data?.listFaq}/>
        </div>
    );
};

export default Page;