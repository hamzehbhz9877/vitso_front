import {instantClient} from "@/services/httpservice";

export const RequestLogin =  (data:LoginRequest) =>
      instantClient.post('Account/Login', data);

export const RequestLogout =  () =>
      instantClient.get('Account/Logout', );
export const RequestRegister =  (data:RegisterAccount) =>
      instantClient.post('Account/Register',data );

export const ConfirmPhone =  (data) =>
      instantClient.post('Account/ConfirmPhone', data);



