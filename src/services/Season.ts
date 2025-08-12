import {instantClient} from "@/services/httpservice";


export const RequestSeasons =  (params:any) =>
    instantClient.get('Season', {params:{...params}});

export const RegisterSeasons =  (data:any) =>
    instantClient.post('Season', data);

export const EditSeasons =  ({id,data}:any) =>
    instantClient.put(`Season/${id}`, data);

export const GetForEditSeasons =  (id) =>
    instantClient.get(`Season/GetForEdit/${id}`);

export const ChangeStatusSeasons =  (id) =>
    instantClient.get(`Season/ChangeStatus/${id}`);

export const DeleteSeasons =  (id) =>
    instantClient.delete(`Season/${id}`);