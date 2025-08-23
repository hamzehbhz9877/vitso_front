import React from "react";
import Faq from "@/components/faq/faq";



type Props={
    faqs:Faq["listFaq"]
    className?: string
}
export default function FaqList({
                                                  faqs,
                                                  className = "",
                                              }: Props) {

    return (
            <div dir="rtl" className={`mx-0 md:mx-10 ${className}`}>
                {faqs?.map((item, idx) => (
                    <Faq key={item.id} {...item}/>
                ))}
            </div>

    )
}