import * as Yup from "yup";

const initialValues = {
    Name: "",
    Type: 1,
    Priority: null,
    ParentId: null,
};

const validationSchema = Yup.object({
    Name: Yup.string()
        .required("نام دسته الزامی است")
        .min(3, "حداقل باید ۳ کاراکتر باشد"),

    Type: Yup.string()
        .required("نوع دسته الزامی است"),

    Priority: Yup.number()
        .required("اولویت الزامی است"),

});

export {initialValues, validationSchema};
