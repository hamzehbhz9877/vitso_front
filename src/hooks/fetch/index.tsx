'use server'

import {redirectStatus} from "@/utils/notFound-server";

import {cookies} from 'next/headers';
import {notFound, redirect} from "next/navigation";

const fetchAPi = async ({url, option}: any) => {
    const cookieHeader = await cookies();

    const res = await fetch(url.toString(), {
        headers: {
            Cookie: cookieHeader?.toString(),
        },
        cache: 'no-cache', credentials: "include", ...option
    })
    if (res.status === 204 || res.status === 401) return [];
    
    if (res.status === 500) {
        throw new Error("خطای سمت سرور")
    }

    const data = await res.json()

    return redirectStatus(data)
}

export {fetchAPi}