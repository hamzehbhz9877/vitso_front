'use client'

import React from 'react';
import {useFAQStore} from "@/state/faq";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

const FaqsQuestions = () => {

    const { faqs ,removeFAQ,updateFAQ} = useFAQStore()

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-3 gap-3">
            {faqs.map((faq) => (
                <Card key={faq.id} className="shadow-sm border">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-base font-semibold">
                            سوال #{faq.priority}
                        </CardTitle>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFAQ(faq.id)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Input
                            value={faq.question}
                            onChange={(e) => updateFAQ(faq.id, 'question', e.target.value)}
                            placeholder="سوال را وارد کنید..."
                        />
                        <Textarea
                            value={faq.answer}
                            onChange={(e) => updateFAQ(faq.id, 'answer', e.target.value)}
                            placeholder="پاسخ را وارد کنید..."
                        />
                        <Input
                            type="number"
                            value={faq.priority}
                            onChange={(e) => updateFAQ(faq.id, 'priority', Number(e.target.value))}
                            placeholder="اولویت"
                        />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default FaqsQuestions;