import {instantClient} from "@/services/httpservice";
import {fetchAPi} from "@/hooks/fetch";
import {getHostAddress} from "../../app.config";

export const RequestAboutUs =  () =>
    instantClient.get('AboutUs', );

export const EditAboutUs =  (data) =>
    instantClient.post('AboutUs',data );


export const GetAboutUs = async () => await fetchAPi({
    url: `${getHostAddress()}/AboutUs`
})