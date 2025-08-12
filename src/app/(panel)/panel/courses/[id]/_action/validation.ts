import * as Yup from "yup";

type InitialValuesInput = {
    isEdit?: boolean;
    courseId?: string;
    title?: string;
    order?: number | null;
};


const getInitialValues = ({ isEdit = false, ...rest }: InitialValuesInput = {}) => ({
    courseId: rest.courseId ?? "",
    title: rest.title ?? "",
    order: rest.order ?? null,
});

const getValidationSchema = () => {
    return Yup.object({
        courseId: Yup.string()
            .required("شناسه دوره الزامی است"),

        title: Yup.string()
            .required("عنوان الزامی است")
            .min(3, "عنوان باید حداقل ۳ کاراکتر باشد"),

        order: Yup.number()
            .nullable()
            .typeError("ترتیب باید یک عدد باشد")
            .min(0, "ترتیب باید حداقل ۱ باشد"),
    });
};

export { getInitialValues, getValidationSchema };
