import {instantClient} from "@/services/httpservice";

export const RegisterBanner = (data: any) =>
    instantClient.post('Banner', data);

export const GetAllBanner = (params) =>
    instantClient.get('Banner', {params: {...params}});

export const EditBanner = (data) =>
    instantClient.put(`Banner`,data);

export const GetBanner = (position) =>
    instantClient.get(`Banner/GetAllBannerForPosition?position=${position}`);

export const RequestDeleteBanner = (id) =>
    instantClient.delete(`Banner/${id}`,);

