import {instantClient} from "@/services/httpservice";

export const RequestEpisodes =  (id:any) =>
    instantClient.get(`Episode/GetAllForSeason/${id}`,);

export const RegisterEpisodes =  (data:any) =>
    instantClient.post('Episode', data);

export const EditEpisodes =  ({id,data}:any) =>
    instantClient.put(`Episode/${id}`, data);

export const GetForEditEpisodes =  (id) =>
    instantClient.get(`Episode/GetForEdit/${id}`);

export const ChangeStatusEpisodes =  (id) =>
    instantClient.get(`Episode/ChangeStatus/${id}`);

export const DeleteEpisodes =  (id) =>
    instantClient.delete(`Episode/${id}`);