import React from 'react';
import { Form, Formik} from "formik";
import SimpleInput from "@/components/input/simple";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
        <DialogContent>
            <DialogHeader>
                <DialogTitle> نمایش اطلاعات</DialogTitle>

            </DialogHeader>
    

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
                                        variant={"outline"}
                                >
                                    بستن
                                </Button>
                            </>
                        </Form>
                    )
                }}
            </Formik>
              </DialogContent>

    );
};

export default AddUser;