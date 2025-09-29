import {instantClient} from "@/services/httpservice";
import {fetchAPi} from "@/hooks/fetch";
import {getHostAddress} from "../../app.config";

export const ProfileTeacher =  (id) =>
    instantClient.get(`Teacher/Profile`);

export const ChangeProfileTeacher =  (data:any) =>
    instantClient.post('Teacher/ChangeProfile', data);

export const GetTeacherInfo = async (id) => await fetchAPi({
    url: `${getHostAddress()}/Teacher/Info/${id}`
})