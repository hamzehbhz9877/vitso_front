
import React from 'react'
import DashboardStat from "@/app/(main)/(userPanel)/profile/wallet/_components/dashboardStat";



const Page = () => {

    return (

        <div className={"dashboard"} id={"dashboard"}>
            <h2 className={"text-xl font-bold mb-3 px-2"}>داشبورد</h2>
            <DashboardStat/>
        </div>
    )
}

export default Page
