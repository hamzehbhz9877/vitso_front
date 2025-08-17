import {instantClient} from "@/services/httpservice";

export const AddDonation = (data: any) =>
    instantClient.post('Donation', data);

export const GetAllDonation = (params) =>
    instantClient.get('Donation', {params: {...params}});

export const GetAllForUserDonation = (params) =>
    instantClient.get('Donation/GetAllForUser', {params: {...params}});

export const GetAllForTeacherDonation = (params) =>
    instantClient.get('Donation/GetAllForTeacher', {params: {...params}});

export const GetDonation = (id):Promise<ApiResponse<Donate>> =>
    instantClient.get(`Donation/${id}`,);


