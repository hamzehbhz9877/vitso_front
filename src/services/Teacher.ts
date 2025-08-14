import {instantClient} from "@/services/httpservice";
import {fetchAPi} from "@/hooks/fetch";

export const ProfileTeacher =  (id) =>
    instantClient.get(`Teacher/Profile`);

export const ChangeProfileTeacher =  (data:any) =>
    instantClient.post('Teacher/ChangeProfile', data);

export const GetTeacherInfo = async (id) => await fetchAPi({
    url: `${process.env.HOST_ADDRESS}/Teacher/Info/${id}`
})