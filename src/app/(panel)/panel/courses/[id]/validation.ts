import * as Yup from "yup";

interface InitialValuesParams {
    isEdit?: boolean;
    date?: string;
    title?: string;
    image?: string;
    slug?: string;
    description?: string;
    shortDescription?: string;
    publishedAt?: string;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    categoryId?: string;
    tagList?: string[];
    level?: number | string;
    priceType?: number | string;
    price?: number | string;
}

export const getInitialValues = ({
                                     isEdit = false,
                                     date,
                                     ...rest
                                 }: InitialValuesParams) => {
    const baseValues = {
        Title: rest.title ?? "",
        Image: rest.image ?? "",
        Slug: rest.slug ?? "",
        Description: rest.description ?? "",
        ShortDescription: rest.shortDescription ?? "",
        PublishedAt: rest.publishedAt?.split(" ")[0] ?? date ?? "",
        MetaTitle: rest.metaTitle ?? "",
        MetaDescription: rest.metaDescription ?? "",
        MetaKeywords: rest.metaKeywords
            ? rest.metaKeywords.split(",").map((item) => item.trim())
            : [],
        CategoryId: rest.categoryId ?? "",
        Tags: rest.tagList ?? [],
    };

    if (!isEdit) {
        return {
            ...baseValues,
            Level: rest.level ?? "",
            PriceType: rest.priceType ?? "",
            Price: rest.price ?? "",
        };
    }

    return baseValues;
};

export const getValidationSchema = ({ isEdit = false }) => {
    const baseSchema = {
        Title: Yup.string().required("عنوان الزامی است"),
        Image: Yup.string().required("تصویر الزامی است"),
        Slug: Yup.string().required("نامک الزامی است"),
        Description: Yup.string().required("توضیحات الزامی است"),
        ShortDescription: Yup.string().required("توضیحات کوتاه الزامی است"),
        PublishedAt: Yup.string().required("تاریخ انتشار الزامی است"),
        MetaTitle: Yup.string().required("عنوان متا الزامی است"),
        MetaDescription: Yup.string().required("توضیحات متا الزامی است"),
        MetaKeywords: Yup.array()
            .of(Yup.string())
            .min(1, "حداقل یک کلمه کلیدی وارد کنید")
            .required("کلمات کلیدی الزامی هستند"),
        CategoryId: Yup.string().required("دسته‌بندی الزامی است"),
        Tags: Yup.array()
            .of(Yup.string())
            .min(1, "حداقل یک برچسب وارد کنید")
            .required("برچسب‌ها الزامی هستند"),
    };

    if (!isEdit) {
        return Yup.object({
            ...baseSchema,
            Level: Yup.number()
                .typeError("سطح باید عدد باشد")
                .required("سطح الزامی است"),
            PriceType: Yup.number()
                .typeError("نوع قیمت باید عدد باشد")
                .required("نوع قیمت الزامی است"),
            Price: Yup.number()
                .typeError("قیمت باید عدد باشد")
                .required("قیمت الزامی است"),
        });
    }

    return Yup.object(baseSchema);
};
