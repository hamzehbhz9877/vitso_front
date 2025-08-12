import React from 'react';
import {CourseDetail} from "@/services/Course";
import CourseDetails from "@/app/(main)/course/_components/courseDetails";
import BreadCrumb from "@/components/breadcrumb/breadCrumb";

const Page = async ({params}: any) => {

    const courseDetails: any = await CourseDetail({slug: params?.id})

    return (
        <div className={"course-page container"}>
            <BreadCrumb data={[
                {
                    url: "/course",
                    title: "دوره"
                },
                {
                    url: `/course?category=${courseDetails.data.categoryName}`,
                    title: courseDetails.data.categoryName
                }, {
                    url: "",
                    title: courseDetails.data.title
                }
            ]}/>

            <CourseDetails {...courseDetails.data} />
        </div>
    );
};

export default Page;