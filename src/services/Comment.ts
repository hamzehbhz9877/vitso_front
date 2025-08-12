import {instantClient} from "@/services/httpservice";


export const GetCommentsForCourse =  (params:any) =>
    instantClient.get('Comment/GetCommentsForCourse', {params:{...params}});

export const GetCommentsForArticle =  (params:any) =>
    instantClient.get('Comment/GetCommentsForArticle', {params:{...params}});

export const GetAllComments =  (params:any) =>
    instantClient.get('Comment', {params:{...params}});

export const RegisterComments =  (data:any) =>
    instantClient.post('Comment', data);

export const GetComments =  (data:any) =>
    instantClient.get(`Comment/${data.id}`, data);

export const GetCommentsForStudent =  (params:any) =>
    instantClient.get(`Comment/GetCommentsForStudent`,{params:{...params}});

export const GetCommentsForStudentDetail =  (id:any) =>
    instantClient.get(`Comment/GetCommentsForStudentDetail/${id}`,);

export const ChangeStatusComments =  (data) =>
    instantClient.post(`Comment/ChangeStatus`,data);

export const DeleteComments =  (id) =>
    instantClient.delete(`Comment/${id}`);