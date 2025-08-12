import * as Yup from "yup";

const initialValues =(ParentId,type)=> ({
    Name: "",
    type: type??null,
    Priority: null,
    ParentId,
});

const validationSchema = Yup.object({
    Name: Yup.string()
        .required("نام دسته الزامی است")
        .min(3, "حداقل باید ۳ کاراکتر باشد"),

    Priority: Yup.number()
        .required("اولویت الزامی است"),

});

export {initialValues, validationSchema};
