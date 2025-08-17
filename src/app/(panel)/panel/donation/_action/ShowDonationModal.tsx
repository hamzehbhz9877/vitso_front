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
import useModal from "@/context/modal/useModal";
import {IoCloseOutline} from "react-icons/io5";
import {useQuery} from "@tanstack/react-query";
import {Button} from "@/components/ui/button";
import {GetForEditContactUs} from "@/services/ContactUs";
import TextArea from "@/components/input/textArea";
import {GetDonation} from "@/services/Donation";

const ShowDonationModal = ({id}: { id: string }) => {

    const {closeModal} = useModal();


    const {data} = useQuery({
        queryFn: ()=>GetDonation(id),
        queryKey: ["donation",id]
    })

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle> نمایش اطلاعات</DialogTitle>

            </DialogHeader>

            <div className={"space-y-4"}>
                <SimpleInput readOnly value={data?.data.amount} label={"مقدار"}  type={"text"}/>
                <SimpleInput readOnly value={data?.data.for} label={"برای"}  type={"text"}/>
                <SimpleInput readOnly value={data?.data.donationDate} label={"تاریخ دونیت"} type={"text"}/>

                <TextArea readOnly value={data?.data.message} isShadcn={false} label={"توضیحات"}/>
            </div>

           <div className={"flex justify-start"}>
               <Button type={"button"} onClick={closeModal}
                       variant={"outline"}
               >
                   بستن
               </Button>
           </div>
        </DialogContent>

    );
};

export default ShowDonationModal;