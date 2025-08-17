'use client'

import React, {useEffect} from 'react';
import Faq from "@/app/(panel)/_components/faq";
import {useQuery} from "@tanstack/react-query";
import {GetAllFaqForCourseOrArticle} from "@/services/Faq";
import {useParams} from "next/navigation";
import {useFAQStore} from "@/state/faq";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

const Page = () => {

    const params = useParams();
    const {addFAQ, faqs, setFAQs} = useFAQStore();

    const {data: faq, isPending} = useQuery({
        queryKey: ["GetAllFaqForCourseOrArticle", params?.id],
        queryFn: () => GetAllFaqForCourseOrArticle(params?.id),
        enabled: !!params.id,
    });

    useEffect(() => {
        if (faq?.data.listFaq.length > 0)
            setFAQs(faq?.data.listFaq)
    }, [faq]);
    return (
        <div>
            {faq?.data.listFaq.length === 0 ? <Faq mode={"add"} isPending={isPending} entityName={"Article"}/> :
                <Faq mode={"edit"} isPending={isPending} entityName={"Article"}/>}
        </div>
    );
};

export default Page;