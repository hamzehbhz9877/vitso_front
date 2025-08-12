'use server'

import {redirectStatus} from "@/utils/notFound-server";

import { cookies } from 'next/headers';

const fetchAPi = async ({url, option}: any) => {
    const cookieHeader = cookies().toString();

    const res = await fetch(url.toString(), {headers:{
            Cookie: cookieHeader,
        },
        cache: 'no-cache',credentials:"include", ...option
    })

    if (res.status === 204) {
        return []
    }

    if (res.status === 401) {
        return []
    }
    const data = await res.json()

    return redirectStatus(data)
}

export {fetchAPi}