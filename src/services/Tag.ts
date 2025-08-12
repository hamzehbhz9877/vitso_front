import {instantClient} from "@/services/httpservice";


export const GetAllTagForSelect =  () =>
    instantClient.get('Tag/GetAllForSelect');