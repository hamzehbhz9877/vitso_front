import * as Yup from "yup";

const initialValues =({date,...rest})=>( {
    Title: rest.title??"",
    Content: rest.content??"",
    Image: rest.image??"",
    Slug: rest.slug??"",
    ShortDescription: rest.shortDescription??"",
    PublishedAt: rest.publishedAt?.split(" ")[0]??date,
    MetaTitle: rest.metaTitle??"",
    MetaDescription: rest.metaDescription??"",
    MetaKeywords: rest.metaKeywords?.split(',').map(item => item.trim())??[],
    CategoryId: rest.categoryId??"",
    Tags:rest.tagList?? []
});

const validationSchema = Yup.object({
    Title: Yup.string()
        .required("عنوان الزامی است"),

    Content: Yup.string()
        .required("محتوا الزامی است"),

    Image: Yup.string()
        .required("تصویر الزامی است"),

    Slug: Yup.string()
        .required("نامک الزامی است"),

    ShortDescription: Yup.string()
        .required("توضیح کوتاه الزامی است"),

    PublishedAt: Yup.string()
        .required("تاریخ انتشار الزامی است"),

    MetaTitle: Yup.string()
        .required("عنوان متا الزامی است"),

    MetaDescription: Yup.string()
        .required("توضیحات متا الزامی است"),

    MetaKeywords: Yup.array()
        .of(Yup.string()).min(1,'کلمات کلیدی متا الزامی هستند')
        .required("کلمات کلیدی متا الزامی هستند"),

    CategoryId: Yup.string()
        .required("دسته‌بندی الزامی است"),

    Tags: Yup.array()
        .of(Yup.string()).min(1,'برچسب‌ها الزامی هستند')
        .required("برچسب‌ها الزامی هستند")
});

export { initialValues, validationSchema };
