'use client'
import * as React from "react"
import {DayPicker} from "react-day-picker/persian"
import {Button} from "@/components/ui/button"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {CalendarIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon} from "lucide-react"
import {cn, formatDate} from "@/lib/utils"
import {getDefaultClassNames, DayButton} from "react-day-picker"
import {buttonVariants} from "@/components/ui/button"
import {ErrorMessage, useField} from "formik";
import {useEffect} from "react";


interface CalendarHijriInputProps {
    label?: string
    placeholder?: string
    infoText?: string
    onChange?: (date?: string) => void
    initialDate?: Date
    name?: string
    initValue?: string
}

export function CalendarHijriInput({
                                       label = "تاریخ زمان‌بندی",
                                       placeholder = "تاریخ را انتخاب کنید",
                                       infoText = "مقاله شما در تاریخ",
                                       onChange,
                                       initValue="",
                                       name,
                                       initialDate,
                                   }: CalendarHijriInputProps) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(initValue);
    const [date, setDate] = React.useState<Date | undefined>(initialDate);
    const [month, setMonth] = React.useState<Date | undefined>(initialDate);


    useEffect(()=>{
        if (initValue)
            setValue(initValue)
    },[initValue])
    React.useEffect(() => {
        if (initialDate) {
            setDate(initialDate);
            setMonth(initialDate);
        }
    }, [initialDate]);

    const [field, meta] = useField(name); // استفاده از useField برای مدیریت ارور و وضعیت فیلد

    return (
        <div>
            <Label htmlFor="date" className="text-[13px] leading-[21px] text-[#62666d] block mb-[10px] ">
                {label}
            </Label>
            <div className="relative flex gap-2">
                <Input
                    id="date"
                    value={value}
                    placeholder={placeholder}
                    readOnly
                    className={cn("custom-input__field", meta.touched && meta.error && name && 'input-field--error')}
                    onClick={() => setOpen(true)}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                            e.preventDefault();
                            setOpen(true);
                        }
                    }}
                />
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            id="date-picker"
                            variant="ghost"
                            className="absolute top-1/2 left-2 w-6 h-6 -translate-y-1/2 p-0 flex items-center justify-center"
                        >
                            <span className="sr-only">انتخاب تاریخ</span>
                            <CalendarIcon className="w-3.5 h-3.5"/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0 !z-[999999]" align="end">
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            month={month}
                            onMonthChange={setMonth}
                            onSelect={(selectedDate) => {
                                setDate(selectedDate);
                                setOpen(false);
                                onChange(formatDate(selectedDate));
                                setValue(formatDate(selectedDate));
                            }}
                            className="rounded-lg border shadow-sm "
                        />
                    </PopoverContent>
                </Popover>
            </div>
            {/*{date && infoText ? (*/}
            {/*    <div className="text-muted-foreground px-1 text-sm text-green-600">*/}
            {/*        {infoText}{" "}*/}
            {/*        <span className="font-bold">{formatDate(date)}</span> منتشر خواهد شد.*/}
            {/*    </div>*/}
            {/*) : null}*/}
            {name ? <ErrorMessage name={name} className="validation-error" component="div"/>
                : ""}
        </div>
    );
}


function Calendar({
                      className,
                      classNames,
                      showOutsideDays = true,
                      captionLayout = "label",
                      buttonVariant = "ghost",
                      formatters,
                      components,
                      ...props
                  }: React.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
    const defaultClassNames = getDefaultClassNames()

    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn(
                "bg-background group/calendar p-3",
                "[--cell-size:theme(spacing.8)]",
                "rtl:[&_.rdp-button_next>svg]:rotate-180",
                "rtl:[&_.rdp-button_previous>svg]:rotate-180",
                className
            )}
            captionLayout={captionLayout}
            formatters={{
                formatMonthDropdown: (date) => date.toLocaleString("fa-IR", {month: "long"}),
                ...formatters,
            }}
            classNames={{
                root: cn("w-fit", defaultClassNames.root),
                months: cn("flex flex-col md:flex-row gap-4 relative", defaultClassNames.months),
                month: cn("flex flex-col w-full gap-4", defaultClassNames.month),
                nav: cn(
                    "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
                    defaultClassNames.nav
                ),
                button_previous: cn(
                    buttonVariants({variant: buttonVariant}),
                    "w-[var(--cell-size)] h-[var(--cell-size)] p-0 select-none aria-disabled:opacity-50",
                    defaultClassNames.button_previous
                ),
                button_next: cn(
                    buttonVariants({variant: buttonVariant}),
                    "w-[var(--cell-size)] h-[var(--cell-size)] p-0 select-none aria-disabled:opacity-50",
                    defaultClassNames.button_next
                ),
                month_caption: cn(
                    "flex items-center justify-center h-[var(--cell-size)] w-full px-[var(--cell-size)]",
                    defaultClassNames.month_caption
                ),
                dropdowns: cn(
                    "w-full flex items-center justify-center gap-1.5 h-[var(--cell-size)] text-sm font-medium",
                    defaultClassNames.dropdowns
                ),
                dropdown_root: cn(
                    "relative border border-input rounded-[6px] shadow-xs ring-[#a1a1a1] focus-within:ring-[3px] focus-within:ring-opacity-60",
                    defaultClassNames.dropdown_root
                ),
                dropdown: cn("absolute inset-0 opacity-0", defaultClassNames.dropdown),
                caption_label: cn(
                    "select-none font-medium",
                    captionLayout === "label"
                        ? "text-sm"
                        : "rounded-md pl-2 pr-1 flex items-center gap-1 text-sm h-8 [&>svg]:text-muted-foreground [&>svg]:w-4 [&>svg]:h-4",
                    defaultClassNames.caption_label
                ),
                table: "w-full border-collapse",
                weekdays: cn("flex", defaultClassNames.weekdays),
                weekday: cn(
                    "text-muted-foreground flex-1 font-normal text-xs rounded-md select-none",
                    defaultClassNames.weekday
                ),
                week: cn("flex w-full mt-2", defaultClassNames.week),
                week_number_header: cn("select-none w-[var(--cell-size)]", defaultClassNames.week_number_header),
                week_number: cn("text-xs select-none text-muted-foreground", defaultClassNames.week_number),
                day: cn(
                    "relative w-full h-full p-0 text-center aspect-square select-none",
                    "[&:first-child[data-selected=true]_button]:rounded-l-md",
                    "[&:last-child[data-selected=true]_button]:rounded-r-md",
                    "group/day",
                    defaultClassNames.day
                ),
                range_start: cn("rounded-l-md bg-accent", defaultClassNames.range_start),
                range_middle: cn("rounded-none bg-accent", defaultClassNames.range_middle),
                range_end: cn("rounded-r-md bg-accent", defaultClassNames.range_end),
                today: cn(
                    "bg-accent text-accent-foreground rounded-full data-[selected=true]:rounded-none",
                    defaultClassNames.today
                ),
                outside: cn(
                    "text-muted-foreground aria-selected:text-muted-foreground",
                    defaultClassNames.outside
                ),
                disabled: cn("text-muted-foreground opacity-50", defaultClassNames.disabled),
                hidden: cn("invisible", defaultClassNames.hidden),
                ...classNames,
            }}
            components={{
                Root: ({className, rootRef, ...props}) => (
                    <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />
                ),
                Chevron: ({className, orientation, ...props}) => {
                    if (orientation === "left") {
                        return <ChevronLeftIcon className={cn("w-4 h-4", className)} {...props} />
                    }
                    if (orientation === "right") {
                        return <ChevronRightIcon className={cn("w-4 h-4", className)} {...props} />
                    }
                    return <ChevronDownIcon className={cn("w-4 h-4", className)} {...props} />
                },
                DayButton: CalendarDayButton,
                WeekNumber: ({children, ...props}) => (
                    <td {...props}>
                        <div
                            className="flex w-[var(--cell-size)] h-[var(--cell-size)] items-center justify-center text-center">
                            {children}
                        </div>
                    </td>
                ),
                ...components,
            }}
            {...props}
        />
    )
}

function CalendarDayButton({
                               className,
                               day,
                               modifiers,
                               ...props
                           }: React.ComponentProps<typeof DayButton>) {
    const defaultClassNames = getDefaultClassNames()

    const ref = React.useRef<HTMLButtonElement>(null)
    React.useEffect(() => {
        if (modifiers.focused) ref.current?.focus()
    }, [modifiers.focused])

    return (
        <Button
            ref={ref}
            variant="ghost"
            size="icon"
            data-day={day.date.toLocaleDateString()}
            data-selected-single={
                modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle
            }
            data-range-start={modifiers.range_start}
            data-range-end={modifiers.range_end}
            data-range-middle={modifiers.range_middle}
            className={cn(
                defaultClassNames.day,
                modifiers.today && "border border-blue-600 bg-blue-100 text-blue-900",
                modifiers.selected && "border border-blue-600 bg-blue-600 text-white",
                className
            )}
            {...props}
        />
    )
}
