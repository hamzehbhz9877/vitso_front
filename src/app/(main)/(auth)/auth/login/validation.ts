import * as Yup from "yup";


const initialValues: LoginRequest = {
    rememberMe: false,
    captcha: "",
    password: "",
    userName: ""
}

const validationSchema = Yup.object({
    rememberMe: Yup.boolean(),
    captcha: Yup.string()
        .required("الزامی"),
    password: Yup.string()
        .required("الزامی"),
    userName: Yup.string()
        .required("الزامی"),
});


export  {initialValues, validationSchema}