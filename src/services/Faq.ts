import {instantClient} from "@/services/httpservice";

export const AddFaq = (data: any) =>
    instantClient.post('Faq', data);

export const GetAllFaq = (params) =>
    instantClient.get('Faq', {params: {...params}});

export const GetFaqAdmin = (position) =>
    instantClient.get(`Faq/GetAllFaqForPosition?position=${position}`,);

export const GetAllFaqForCourseOrArticle = (entityId) =>
    instantClient.get(`Faq/GetAllFaqForCourseOrArticle/${entityId}`,);

export const EditFaq = (data) =>
    instantClient.put(`Faq`,data);

export const DeleteFaq = (id) =>
    instantClient.delete(`Faq/${id}`,);


