import {instantClient} from "@/services/httpservice";

export const GetCaptcha = () =>
    instantClient.get('Captcha/GetCaptcha',{ responseType: 'blob' });