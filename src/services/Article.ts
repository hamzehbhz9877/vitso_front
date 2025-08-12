import {instantClient} from "@/services/httpservice";
import {fetchAPi} from "@/hooks/fetch";
import fetchApiClient from "@/hooks/fetch/client";


const isServer = typeof window === "undefined";

const fetcher=isServer?fetchAPi:fetchApiClient

export const RequestArticles =  (params:any) =>
    instantClient.get('Article', {params:{...params}});

export const RegisterArticles =  (data:any) =>
    instantClient.post('Article', data);

export const EditArticles =  ({id,data}:any) =>instantClient.put(`Article/${id}`, data);

export const GetForEditArticles =  (id) =>
    instantClient.get(`Article/GetForEdit/${id}`);

export const ChangeStatusArticles =  (id) =>
    instantClient.get(`Article/ChangeStatus/${id}`);

export const DeleteArticles =  (id) =>
    instantClient.delete(`Article/${id}`);



export const ArticleByCategory = async (query: any) => {
    const {pageParam = 1,isfree=true, ...rest}: any = query
    return await fetcher({
        url: `${process.env.HOST_ADDRESS}/Article/Filter?pageCurrent=${query.pageCurrent ?? pageParam}&pageSize=10&` + new URLSearchParams({
            ...rest
        })
    })
}

export const ArticleDetail = async (query: any) => {
    const {slug,...rest}: any = query
    return await fetchAPi({url:`${process.env.HOST_ADDRESS}/Article/GetWithSlug/${slug}` + new URLSearchParams({
            ...rest
        })
    })
}