import {instantClient} from "@/services/httpservice";

export const GetAllRoleForSelect =  () =>
    instantClient.get('Role/GetAllForSelect');