import React from 'react';
import Bottom from "@/layout/userpanel/bottom";
import "./index.css"
import Top from "@/layout/userpanel/top";
const UserPanelSideBar = () => {
    return (
        <div className={"sideBar static lg:sticky lg:top-4 h-max"}>
            {/*<div className={"w-64 bg-base-300 rounded-lg p-3"}>*/}
            {/*    <div className={"flex items-center gap-4"}>*/}
            {/*        <div className="avatar avatar-online">*/}
            {/*            <div className="w-16 rounded-full">*/}
            {/*                <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className={"flex flex-col gap-2 text-sm"}>*/}
            {/*            <span>حمزه بهرامی زاد</span>*/}
            {/*            <span>0915648288</span>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <div className={"flex items-center justify-between mt-4 text-sm"}>*/}
            {/*        <span>موجودی کیف پول</span>*/}
            {/*        <button className={"badge badge-ghost"}>0 تومان</button>*/}
            {/*    </div>*/}

            {/*</div>*/}
            <Top/>
            <Bottom/>
        </div>
    );
};

export default UserPanelSideBar;