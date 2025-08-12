import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import moment from "jalali-moment";
import type {FilterFn} from "@tanstack/react-table";
import {rankItem} from "@tanstack/match-sorter-utils";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date?: Date) {
  if (!date) return ""
  return date.toLocaleDateString("fa-IR")
}

export function objectToFormData(obj: Record<string, any>): FormData {
  const formData = new FormData()

  Object.entries(obj).forEach(([key, value]) => {
    const pascalKey = key.charAt(0).toUpperCase() + key.slice(1)

    if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(pascalKey, item)
      })
    } else if (value instanceof File) {
      formData.append(pascalKey, value)
    } else if (value !== null && value !== undefined) {
      formData.append(pascalKey, value)
    } else {
      formData.append(pascalKey, "")
    }
  })

  return formData
}


export function  asObjectArray (data,valueKey,labelKey){
  return data.map((item) => ({
    value: String(item?.[valueKey] ?? ''),
    label: String(item?.[labelKey] ?? ''),
  }))
}



export const timeStringToDate = (time?: string): Date => {
  if (!time) return new Date(0, 0, 0, 0, 0, 0);
  const [h, m, s] = time.split(":").map(Number);
  const d = new Date();
  d.setHours(h || 0, m || 0, s || 0, 0);
  return d;
};

export const formatTime = (date: Date): string => {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};


export const faToEnDigits = (str: string): string =>
    str.replace(/[۰-۹]/g, d => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));

export const parseJalaliDateToDate = (jalaliDateStr?: string): Date | undefined => {
  if (!jalaliDateStr) return undefined;
  const en = faToEnDigits(jalaliDateStr);
  const m = moment(en, 'jYYYY/jM/jD');
  return m.isValid() ? m.toDate() : undefined;
};

export const convertDateToJalaliString = (date: Date): string => {
  return moment(date).format('jYYYY/jM/jD');
};


export const diffDays = (data) => {
  const date1 = moment(data, "jYYYY/jMM/jDD"); // تبدیل تاریخ شمسی به moment
  const date2 = moment(); // تاریخ فعلی میلادی

  const duration = moment.duration(date2.diff(date1));

  const months = duration.months();
  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  if (months > 0) {
    return months + " ماه";
  } else if (days > 0) {
    return days + " روز";
  } else if (hours > 0) {
    return hours + " ساعت";
  } else if (minutes > 0) {
    return minutes + " دقیقه";
  } else {
    return seconds + " ثانیه";
  }
}


export function copyToClipboard(copyMe: string) {
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    navigator.clipboard.writeText(copyMe).catch(() => {
    });
  }
}


export function calculateDiscountPercentage(price:string, payablePrice:string) {
  // حذف کاما از مقادیر و تبدیل به عدد
  const priceNumber = +price?.replaceAll("٬", "");
  const payablePriceNumber = +payablePrice?.replaceAll("٬", "");

  // محاسبه درصد تخفیف
  return ((priceNumber - payablePriceNumber) / priceNumber) * 100
}


export  const fuzzyFilter: FilterFn<any> = (row, columnId, filterValue) => {
  const itemRank = rankItem(row.getValue(columnId), filterValue)
  return itemRank.passed
}

export const scrolltoHash = function (element_id: string,offset=0) {
  const element = document.getElementById(element_id)
  document.documentElement?.scrollTo({top: element?.offsetTop+offset});
}