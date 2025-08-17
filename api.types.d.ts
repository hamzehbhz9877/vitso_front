
type LoginRequest = {
    userName: string
    password: string
    captcha: string
    rememberMe: boolean
}

type ApiResponse<T> = {
    data: T
    isSuccess: boolean
    statusCode: number
    message: string
}

type User = {
    id: string
    userName: string
    firstName: string
    lastName: string
    phone: string
    roles: string
    status: string
}

type Category = {
    id: string
    name: string
    icon?:string,
    parentName: string
    priority: number
    type: string
    countSub?: number
}

type Article = {
    icon?:string,
    id?: string
    slug?: string
    title: string
    shortDescription?: string
    image?: string
    publishDate?: string // Persian calendar
    publishedAt?: string // Alternative date format
    author?: string
    categoryName?: string
    viewCount?: number
}

type ArticleDetail = Article & {
    authorId:string
    authorAvatar:string
    authorName?: string
    content?: string
    metaTitle?: string
    metaDescription?: string
    metaKeywords?: string
    shortLink?: string
    tagList?: string[]
}
type Episode = {
    id: string
    title: string
    duration: string
    isFree: string
    order: number
    publishedAt: string
    videoUrl: string
}

type ContactUs = {
    id: string
    name: string
    email: string
    phone: string
    subject: string
    message: string
    createdAt: string
}


type Season = {
    id: string
    title: string
    order: number
    duration: string
    episodes: Episode[]
}

type Course = {
    authorId:string
    authorAvatar:string
    shortDescription: string,
    shortLink: string,
    completionPercentage: number,
    countEpisode: number,
    commentCount: number,
    studentCount: number,
    isStudentOfCourse:boolean
    discountRemaining: {
        daysRemaining: number,
        hoursRemaining: number,
        minutesRemaining: number,
        secondsRemaining: number
    },
    id: string
    slug: string
    title: string
    author?: string
    description?: string
    image?: string
    categoryName: string
    level?: string
    status?: string
    authorName?: string
    time?: string
    discountPercentage?: number
    price?: string
    payablePrice?: string
    publishedAt: string
    viewCount: number
    tagList?: string[]
    metaTitle?: string
    metaDescription?: string
    metaKeywords?: string
    seasons?: Season[]
    approximateEpisodeCount?:number
}


type RegisterAccount={
    userName: string,
    phone: string,
    firstName: string,
    lastName: string,
    password: string,
    confirmPassword: string
}

type ConfirmCode={
    phone: string,
    code:string
}


type CartItem = {
    discountPercentage: number;
    image: string;
    itemId: string;
    name: string;
    payablePrice: string; // prices stored as strings, maybe formatted with commas
    price: string;
};

type ShoppingCart = {
    count: number;       // total number of items in the cart
    items: CartItem[];   // array of items in the cart
    payablePrice?: string; // optional total payable price for the whole cart (if available)
    price?: string;        // optional total original price for the whole cart (if available)
};


type CoursePrice={
    courseId?: string,
    amount: number,
    discountPercentage: number,
    endDateDiscount: string
    createdAt: string
}

enum CategoryType {
    Course,
    Article,
}


type TransactionStatus = 0 | 1 | 2;
// فرضاً 0 = در انتظار پرداخت، 1 = پرداخت شده، 2 = ناموفق یا لغو شده

type Transaction ={
    id: string;
    amount: number;
    reason: string;
    statusFa: string; // مثلا "در انتظار پرداخت"
    status: TransactionStatus;
    serial: string;
    authority: string;
    description: string;
    fee?: number | null;
    shaparakFee?: number | null;
    referenceCode?: string | null;
    createdAt?: string | null;
}

type Invoice = {
    id: string;                    // شناسه یکتا (UUID)
    serial: string;                    // شناسه یکتا (serial)
    fullName: string;                    // شناسه یکتا (UUID)
    price: string;                 // قیمت با فرمت رشته‌ای و جداکننده فارسی (٬)
    courseCount: number;          // تعداد دوره‌ها
    paymentDate: string;          // تاریخ و ساعت پرداخت (مثلاً 1404/05/13 17:33)
    status: 0 | 1;                // وضعیت عددی (0 = پرداخت نشده، 1 = پرداخت شده)
    statusFa: string;             // وضعیت به فارسی (مثلاً "پرداخت شده")
};

type Level = "مقدماتی" | "متوسط" | "پیشرفته" // به عنوان مثال
type Status = "در حال آماده سازی" | "منتشر شده" | "تکمیل شده" // نمونه

type StudentCourse = {
    completionPercent: number
    courseId: string
    image: string
    level: Level
    slug: string
    status: Status
    title: string
}


type Comments={
    createdAt: string;
    for: string;
    fullName: string;
    id: string;
    message: string;
    status: string;
    statusFa: string;
    avatar?:string;
    isTeacher?:boolean;
    isStudent?:boolean;
}

type CommentsUsers= Comments  & {
    replies:Array<Comments>;
}


type Teacher = {
    avatar: string
    firstName: string
    lastName: string
    skill: string
    degree: string
    aboutMe: string
}


type Donate={
    id: string,
    amount: number,
    fromUser: string,
    donationDate: string,
    message: string,
    for: string
}

type Faq={
    entityName: string,
    positionFa:? string,
    position: string,
    questionCount: number,
    createdAt:string,
    listFaq:{
        priority:string
        question:string
        answer:string
    }[]
}