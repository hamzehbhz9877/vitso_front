"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { TimePickerInput } from "./input";
import {formatTime, timeStringToDate} from "@/lib/utils";

interface TimePickerDemoProps {
    value?: string;               // رشته زمان مثل "00:45:00"
    onChange: (val: string) => void;  // مقدار زمان جدید به فرمت string می‌فرسته بیرون
}

export function TimePickerDemo({ value, onChange }: TimePickerDemoProps) {
    // تبدیل رشته زمان به Date


    // حالت داخلی تاریخ (Date) برای کنترل اجزای ورودی ساعت/دقیقه/ثانیه
    const [localDate, setLocalDate] = React.useState<Date>(timeStringToDate(value));

    // وقتی prop `value` تغییر کرد، localDate رو هم بروز کن
    React.useEffect(() => {
        setLocalDate(timeStringToDate(value));
    }, [value]);

    const minuteRef = React.useRef<HTMLInputElement>(null);
    const hourRef = React.useRef<HTMLInputElement>(null);
    const secondRef = React.useRef<HTMLInputElement>(null);

    // وقتی زمان تغییر کرد، هم localDate آپدیت می‌شه هم مقدار جدید به بیرون فرستاده می‌شه
    const handleDateChange = (date: Date) => {
        setLocalDate(date);
        onChange(formatTime(date));
    };

    return (
        <div className="flex items-end gap-2">
            <div className="text-center">
                <Label htmlFor="hours" className="custom-input__title">
                    ساعت
                </Label>
                <TimePickerInput
                    picker="hours"
                    date={localDate}
                    setDate={handleDateChange}
                    ref={hourRef}
                    onRightFocus={() => minuteRef.current?.focus()}
                />
            </div>
            <div className="text-center">
                <Label htmlFor="minutes" className="custom-input__title">
                    دقیقه
                </Label>
                <TimePickerInput
                    picker="minutes"
                    date={localDate}
                    setDate={handleDateChange}
                    ref={minuteRef}
                    onLeftFocus={() => hourRef.current?.focus()}
                    onRightFocus={() => secondRef.current?.focus()}
                />
            </div>
            <div className="text-center">
                <Label htmlFor="seconds" className="custom-input__title">
                    ثانیه
                </Label>
                <TimePickerInput
                    picker="seconds"
                    date={localDate}
                    setDate={handleDateChange}
                    ref={secondRef}
                    onLeftFocus={() => minuteRef.current?.focus()}
                />
            </div>
            <div className="flex h-10 items-center">
                <Clock className="ml-2 h-4 w-4" />
            </div>
        </div>
    );
}
