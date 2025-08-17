'use client'

import React, {useEffect} from 'react';
import {useMutation, useQuery} from "@tanstack/react-query";
import {EditAboutUs, RequestAboutUs} from "@/services/AboutUs";
import dynamic from "next/dynamic";
import {Button} from "@/components/ui/button";
import {objectToFormData} from "@/lib/utils";
const Editor = dynamic(() => import('@/components/editor'), { ssr: false });

const Page = () => {

    const {data}=useQuery({
        queryFn:RequestAboutUs,
        queryKey:["aboutUs"]
    });

    const {mutate, isPending} = useMutation({
        mutationFn: EditAboutUs,
    });

    const [state,setState] = React.useState("")


    useEffect(() => {
            if (data?.data)
                setState(data?.data)
    }, [data]);

    const handleSubmitAboutUs=()=>{
        const data:any=objectToFormData({content:state})
        mutate(data)
    }

    return (
        <div className="about-us">
            <h2 className={"text-xl font-bold mb-3 lg:text-2xl"}>درباره ما</h2>

            <div className={"mb-5"}>
                <Editor
                    uploadUrl="/Upload/ImageAboutUsContent"
                    defaultData={data?.data}
                    getEditorData={(data, getText) => {
                        setState(getText !== "" ? data : "");
                    }}
                />
            </div>

            <Button isPending={isPending} onClick={handleSubmitAboutUs} type={"submit"} disabled={isPending}
                    variant={"outline"}
            >
                ثبت اطلاعات
            </Button>
        </div>
    );
};

export default Page;