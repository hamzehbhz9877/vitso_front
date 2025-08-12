import React from 'react';
import { Form, Formik} from "formik";
import SimpleInput from "@/components/input/simple";
import {ModalHeader} from "@/components/modal";
import useModal from "@/hooks/useModal";
import {IoCloseOutline} from "react-icons/io5";
import {useQuery} from "@tanstack/react-query";
import {Button} from "@/components/ui/button";
import {GetForEditContactUs} from "@/services/ContactUs";
import TextArea from "@/components/input/textArea";

const AddUser = ({id}: { id: string }) => {

    const {handleClose} = useModal();
    

    const {data: contactus} = useQuery({
        queryFn: ()=>GetForEditContactUs(id),
        queryKey: ["contactus",id]
    })

    return (
        <div>
            <ModalHeader>
                <div className={"flex items-center justify-between"}>
                    <span
                        className="text-[16px] font-bold text-[#2F2F2F]">نمایش اطلاعات</span>
                    <IoCloseOutline className={"cursor-pointer"} size={24} color={"#2F2F2F"} onClick={handleClose}/>
                </div>
            </ModalHeader>
            <hr className={"border-[#ABAFB1] my-[20px]"}/>

            <Formik
                initialValues={{
                    name: contactus?.data.name,
                    email: contactus?.data.email,
                    phone: contactus?.data.phone,
                    subject: contactus?.data.subject,
                    message: contactus?.data.message,
                }}
                enableReinitialize
                onSubmit={()=>{}}
                validationSchema={{}}
            >
                {() => {
                    return (
                        <Form>
                            <>
                                <div className="mb-3 ">تاریخ ایجاد: <span className={"font-bold text-green-500"}>{contactus?.data.createdAt}</span></div>
                                <div
                                    className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-[16px] mb-[20px]"}>
                                    <SimpleInput readOnly label={"نام"} name={"name"} type={"text"}/>
                                    <SimpleInput readOnly label={"ایمیل"} name={"email"} type={"text"}/>
                                    <SimpleInput readOnly label={"شماره همراه"} name={"phone"} type={"text"}/>
                                    <SimpleInput readOnly label={"موضوع"} name={"subject"} type={"text"}/>
                                </div>
                                <TextArea label={"توضیحات"} name={"message"} rows={5}/>

                                <Button type={"button"} onClick={handleClose}
                                        variant={"default"}
                                >
                                    بستن
                                </Button>
                            </>
                        </Form>
                    )
                }}
            </Formik>
        </div>

    );
};

export default AddUser;