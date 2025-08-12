import {instantClient} from "@/services/httpservice";


export const RequestContactUs =  (params:any) =>
    instantClient.get('ContactUs', {params:{...params}});

export const RegisterContactUs =  (data:any) =>
    instantClient.post('ContactUs', data);

export const EditContactUs =  (data:any) =>
    instantClient.put(`ContactUs/${data.id}`, data);

export const GetForEditContactUs =  (id) =>
    instantClient.get(`ContactUs/${id}`);

export const ReqDeleteContactUs =  (id) =>
    instantClient.delete(`ContactUs/${id}`);