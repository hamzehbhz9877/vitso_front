import React from 'react';
import Bottom from "@/layout/userpanel/bottom";
import "./index.css"
import Top from "@/layout/userpanel/top";
const UserPanelSideBar = () => {
    return (
        <div className={"sideBar static lg:sticky lg:top-4 h-max"}>

            <Top/>
            <Bottom/>
        </div>
    );
};

export default UserPanelSideBar;