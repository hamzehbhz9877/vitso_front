import {instantClient} from "@/services/httpservice";

export const GetPosition = (entityName) =>
    instantClient.get(`Position?entityName=${entityName}`,);

export const GetEntityNames = () =>
    instantClient.get(`Position/EntityNames`,);