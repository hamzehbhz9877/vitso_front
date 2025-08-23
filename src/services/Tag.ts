import {instantClient} from "@/services/httpservice";
import {fetchAPi} from "@/hooks/fetch";
import fetchApiClient from "@/hooks/fetch/client";
const isServer = typeof window === "undefined";

const fetcher=isServer?fetchAPi:fetchApiClient


export const GetAllTagForSelect =  () =>
    instantClient.get('Tag/GetAllForSelect');



export const FilterByTag = async (query: any) => {
    const {slug}: any = query
    return await fetcher({
        url: `${process.env.HOST_ADDRESS}/Tag/Filter?slug=${slug}`
    })
}