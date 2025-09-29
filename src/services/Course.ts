import {instantClient} from "@/services/httpservice";
import {fetchAPi} from "@/hooks/fetch";
import {getHostAddress} from "../../app.config";

export const RequestCourses =  (params:any) =>
    instantClient.get('Course', {params:{...params}});

export const GetAllCourseForStudentCourse =  (params:any) =>
    instantClient.get('Course/GetAllCourseForStudent', {params:{...params}});

export const GetAllPriceWithPagination =  (params:any) =>
    instantClient.get('Course/GetAllPriceWithPagination', {params:{...params}});

export const RegisterCourses =  (data:any) =>
    instantClient.post('Course', data);

export const NewPrice =  (data:any) =>
    instantClient.post('Course/NewPrice', data);

export const EditCourses =  ({id,data}:any) =>instantClient.put(`Course/${id}`, data);

export const GetForEditCourses =  (id) =>
    instantClient.get(`Course/GetForEdit/${id}`);

export const ChangeStatusCourses =  (id) =>
    instantClient.get(`Course/ChangeStatus/${id}`);

export const DeleteCourses =  (id) =>
    instantClient.delete(`Course/${id}`);



export const CourseDetail = async (query: any) => {
    const {slug,...rest}: any = query
    return await fetchAPi({url:`${getHostAddress()}/Course/GetWithSlug/${slug}` + new URLSearchParams({
            ...rest
        })
    })
}