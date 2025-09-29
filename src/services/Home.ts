import {fetchAPi} from "@/hooks/fetch";
import {getHostAddress} from "../../app.config";

export const GetHomepageCategory = async () => await fetchAPi({
    url: `${getHostAddress()}/Home/Category`
})


export const GetCoursesAndArticles = async () => await fetchAPi({
    url: `${getHostAddress()}/Home/CoursesAndArticles`


})

export const GetHomeStatInfo = async () => await fetchAPi({
    url: `${getHostAddress()}/Home/Info`
})


export const GetAllFaqForCourseOrArticle = async (entityId) => await fetchAPi({
    url: `${getHostAddress()}/Faq/GetAllFaqForCourseOrArticle/${entityId}`
})