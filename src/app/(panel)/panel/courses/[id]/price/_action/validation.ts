import * as Yup from "yup";




const initialValues = {
    amount: null,
    discountPercentage:null,
    endDateDiscount: null,
};

const getValidationSchema = () => {
    return Yup.object({
        amount: Yup.number()
            .typeError("مبلغ باید عدد باشد")
            .positive("مبلغ باید مثبت باشد")
            .required("مبلغ الزامی است"),

        discountPercentage: Yup.number()
            .nullable()
            .min(0, "درصد تخفیف نمی‌تواند کمتر از ۰ باشد")
            .max(100, "درصد تخفیف نمی‌تواند بیشتر از ۱۰۰ باشد"),

        endDateDiscount: Yup.string()
            .nullable(),
    });
};

export { initialValues, getValidationSchema };
