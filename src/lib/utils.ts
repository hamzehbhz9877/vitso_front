import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import moment from "jalali-moment";
import type {FilterFn} from "@tanstack/react-table";
import {rankItem} from "@tanstack/match-sorter-utils";
import { Accept } from "react-dropzone"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date?: Date) {
  if (!date) return ""
  return date.toLocaleDateString("fa-IR")
}
export const formatSpeed = (bytesPerSec: number | null) => {
  if (bytesPerSec === null) return "--";
  const kb = bytesPerSec / 1024;
  const mb = kb / 1024;

  if (mb >= 1) return mb.toFixed(2) + " MB/s";
  return kb.toFixed(1) + " KB/s";
};

export function capitalizeKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(capitalizeKeys)
  } else if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
          key.charAt(0).toUpperCase() + key.slice(1),
          value
        ])
    )
  }
  return obj
}

export function getExtensionsFromAccept(accept: Accept): string[] {
  return Object.values(accept)
      .filter(Boolean)
      .flatMap(v => {
        if (Array.isArray(v)) return [...v] // تبدیل readonly string[] به string[]
        return [v]
      })
}
export function formatFileSize(bytes: number) {
  if (bytes < 1024) return { value: bytes, unit: "B" }
  else if (bytes < 1024 * 1024) return { value: Math.round(bytes / 1024), unit: "KB" }
  else return { value: Math.round(bytes / 1024 / 1024), unit: "MB" }
}

export function objectToFormData(obj: any, formData = new FormData()): FormData {
  if (!obj) return formData;

  Object.entries(obj).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === "object" && item !== null) {
          // آرایه‌ها: کلید اصلی + [index] + زیرکلیدها با .
          Object.entries(item).forEach(([subKey, subValue]) => {
            if (subValue instanceof File) {
              formData.append(`${key}[${index}].${subKey}`, subValue);
            } else {
              formData.append(`${key}[${index}].${subKey}`, String(subValue ?? ""));
            }
          });
        } else {
          formData.append(`${key}[${index}]`, item ?? "");
        }
      });
    } else if (typeof value === "object" && value !== null) {
      // اشیای معمولی: کلید اصلی + .subKey
      Object.entries(value).forEach(([subKey, subValue]) => {
        if (subValue instanceof File) {
          formData.append(`${key}.${subKey}`, subValue);
        } else {
          formData.append(`${key}.${subKey}`, subValue ?? "");
        }
      });
    } else {
      formData.append(key, (value ?? "").toString());
    }
  });

  return formData;
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



export const diffDays = (data: string) => {
  const date1 = moment(data, "jYYYY/jMM/jDD"); // تاریخ شمسی ورودی
  const date2 = moment(); // تاریخ فعلی

  const months = date2.diff(date1, "months"); // اختلاف کل ماه‌ها
  const days = date2.diff(date1, "days");     // اختلاف کل روزها

  if (months > 0) {
    return months + " ماه";
  } else if (days > 0) {
    return days + " روز";
  } else {
    return "امروز";
  }
};



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