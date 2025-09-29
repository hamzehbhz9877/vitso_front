import * as Yup from "yup";

type InitialValuesInput = {
    isEdit?: boolean;
    SeasonId?: string;
    Title?: string;
    VideoFile?: string;
    VideoUrl?: string;
    Duration?: string;
    Order?: number | null;
    IsFree?: string|boolean;
    PublishedAt?: string;
};

const getInitialValues = ({ isEdit = false, ...rest }: InitialValuesInput = {}) => {
    const base = {
        Title: rest.Title ?? "",
        VideoFile: rest.VideoUrl ?? "",
        Duration: rest.Duration ?? "00:00:00",
        Order: rest.Order ?? null,
        IsFree: rest.IsFree !== 'غیر رایگان',
        PublishedAt: rest.PublishedAt?.split(" ")[0] ?? "",
    };

    // // فقط در حالت ایجاد (Create)
    // if (!isEdit) {
    //     return {
    //         SeasonId: rest.SeasonId ?? "",
    //         ...base,
    //     };
    // }

    return base;
};

const getValidationSchema = (isEdit = false) => {
    const baseSchema = {
        Title: Yup.string()
            .required("عنوان الزامی است")
            .min(3, "عنوان باید حداقل ۳ کاراکتر باشد"),

        VideoFile: Yup.string()
            .required("ویدیو الزامی است"),

        Duration: Yup.string()
            .required("مدت زمان الزامی است"),

        Order: Yup.number()
            .nonNullable("ترتیب را وارد کنید")
            .typeError("ترتیب باید یک عدد باشد")
            .min(0, "ترتیب باید حداقل ۰ باشد"),

        IsFree: Yup.boolean(),

        PublishedAt: Yup.string()
            .required("تاریخ انتشار الزامی است"),
    };

    // فقط در حالت ایجاد (Create)
    // if (!isEdit) {
    //     return Yup.object({
    //         SeasonId: Yup.string().required("شناسه فصل الزامی است"),
    //         ...baseSchema,
    //     });
    // }

    return Yup.object(baseSchema);
};

export { getInitialValues, getValidationSchema };
