import * as Yup from "yup";

const initialValues:RegisterAccount = {
    userName: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    phone: "",
};

const validationSchema = Yup.object({
    userName: Yup.string()
        .required("نام کاربری الزامی است")
        .min(3, "حداقل باید ۳ کاراکتر باشد"),

    firstName: Yup.string()
        .required("نام الزامی است")
        .min(2, "حداقل باید ۲ کاراکتر باشد"),

    lastName: Yup.string()
        .required("نام خانوادگی الزامی است")
        .min(2, "حداقل باید ۲ کاراکتر باشد"),

    password: Yup.string()
        .required("رمز عبور الزامی است")
        .min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),

    confirmPassword: Yup.string()
        .required("تکرار رمز عبور الزامی است")
        .oneOf([Yup.ref("password")], "رمز عبور مطابقت ندارد"),

    phone: Yup.string()
        .required("شماره همراه الزامی است")
        .test("valid-phone", "شماره همراه نامعتبر است", function (value) {
            const phoneRegex = /^(\+98|0)?9\d{9}$/;
            return phoneRegex.test(value ?? "");
        }),
});

export { initialValues, validationSchema };
