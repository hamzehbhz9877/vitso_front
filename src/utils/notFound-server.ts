import {notFound} from "next/navigation";

export const redirectStatus=(data)=>{
    //

    if (data.status===404)
        return notFound()
    else return data
}