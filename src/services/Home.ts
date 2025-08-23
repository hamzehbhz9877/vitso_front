import {fetchAPi} from "@/hooks/fetch";

export const GetHomepageCategory = async () => await fetchAPi({
    url: `${process.env.HOST_ADDRESS}/Home/Category`
})


export const GetCoursesAndArticles = async () => await fetchAPi({
    url: `${process.env.HOST_ADDRESS}/Home/CoursesAndArticles`


})

export const GetHomeStatInfo = async () => await fetchAPi({
    url: `${process.env.HOST_ADDRESS}/Home/Info`
})


export const GetAllFaqForCourseOrArticle = async (entityId) => await fetchAPi({
    url: `${process.env.HOST_ADDRESS}/Faq/GetAllFaqForCourseOrArticle/${entityId}`
})