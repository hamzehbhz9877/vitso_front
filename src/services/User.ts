import {instantClient} from "@/services/httpservice";


export const RequestUsers =  (params:any) =>
    instantClient.get('User', {params:{...params}});

export const RegisterUsers =  (data:any) =>
    instantClient.post('User', data);

export const ChangeProfileStudent =  (data:any) =>
    instantClient.post('Account/ChangeProfile', data);

export const EditUsers =  (data:any) =>
    instantClient.put(`User/${data.id}`, data);

export const GetForEditUsers =  (id) =>
    instantClient.get(`User/GetForEdit/${id}`);

export const ChangeStatusUsers =  (id) =>
    instantClient.get(`User/ChangeStatus/${id}`);

export const ProfileStudent =  (id) =>
    instantClient.get(`Account/Profile`);

export const DeleteUsers =  (id) =>
    instantClient.delete(`User/${id}`);