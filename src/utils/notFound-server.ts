import {notFound} from "next/navigation";

export const redirectStatus=(data)=>{
    if (!data.isSuccess)
        return notFound()
    else return data
}