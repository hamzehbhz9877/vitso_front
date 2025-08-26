import {instantClient} from "@/services/httpservice";

import {fetchAPi} from "@/hooks/fetch";
import fetchApiClient from "@/hooks/fetch/client";


const isServer = typeof window === "undefined";

const fetcher=isServer?fetchAPi:fetchApiClient


export const RequestCategory =  (params:any) =>
    instantClient.get('Category/GetAllParentWithPagination', {params:{...params}});

export const RequestSubCategory =  (params:any) =>
    instantClient.get('Category/GetAllSubWithPagination', {params:{...params}});

export const RegisterCategory =  (data:any) =>
    instantClient.post('Category', data);

export const EditCategory =  ({id,data}:any) =>
    instantClient.put(`Category/${id}`, data);

export const GetForEditCategory =  (id) =>
    instantClient.get(`Category/${id}`);

export const RequestDeleteCategory =  (id) =>
    instantClient.delete(`Category/${id}`);

export const GetAllForSelectCategory =  (type) =>
    instantClient.get(`Category/GetAllForSelect/${type}`);

export const GetAllSubForSelect =  (type) =>
    instantClient.get(`Category/GetAllSubForSelect/${type}`);



export const CourseByCategory = async (query: any) => {
    const {pageParam = 1,isfree=true, ...rest}: any = query
    return await fetcher({
        url: `${process.env.HOST_ADDRESS}/Course/Filter?pageCurrent=${query.pageCurrent ?? pageParam}&pageSize=10&isFree=true&` + new URLSearchParams({
            ...rest
        })
    })
}

export const GetAllWithSubCategory = async (type) => await fetchAPi({
    url: `${process.env.HOST_ADDRESS}/Category/GetAllWithSub/${type}`,
})
