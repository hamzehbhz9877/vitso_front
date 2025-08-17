import * as Yup from "yup";

type InitialValuesInput = {
    isEdit?: boolean;
    seasonId?: string;
    title?: string;
    videoUrl?: string;
    duration?: string;
    order?: number | null;
    isFree?: boolean;
    publishedAt?: string;
};

const getInitialValues = ({ isEdit = false, ...rest }: InitialValuesInput = {}) => {
    const base = {
        title: rest.title ?? "",
        videoUrl: rest.videoUrl ?? "",
        duration: rest.duration ?? "00:00:00",
        order: rest.order ?? null,
        isFree: rest.isFree ?? false,
        publishedAt: rest.publishedAt ?? "",
    };

    // فقط در حالت ایجاد (Create)
    if (!isEdit) {
        return {
            seasonId: rest.seasonId ?? "",
            ...base,
        };
    }

    return base;
};

const getValidationSchema = (isEdit = false) => {
    const baseSchema = {
        title: Yup.string()
            .required("عنوان الزامی است")
            .min(3, "عنوان باید حداقل ۳ کاراکتر باشد"),

        videoUrl: Yup.string()
            .url("آدرس ویدیو معتبر نیست")
            .required("آدرس ویدیو الزامی است"),

        duration: Yup.string()
            .required("مدت زمان الزامی است"),

        order: Yup.number()
            .nonNullable("ترتیب را وارد کنید")
            .typeError("ترتیب باید یک عدد باشد")
            .min(0, "ترتیب باید حداقل ۰ باشد"),

        isFree: Yup.boolean(),

        publishedAt: Yup.string()
            .required("تاریخ انتشار الزامی است"),
    };

    // فقط در حالت ایجاد (Create)
    if (!isEdit) {
        return Yup.object({
            seasonId: Yup.string().required("شناسه فصل الزامی است"),
            ...baseSchema,
        });
    }

    return Yup.object(baseSchema);
};

export { getInitialValues, getValidationSchema };
