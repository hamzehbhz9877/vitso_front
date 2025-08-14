import React from 'react';
import {BsInfoCircle} from "react-icons/bs";
import {MdOutlineOndemandVideo} from "react-icons/md";
import {IoTimeOutline} from "react-icons/io5";
import {PiGraduationCapThin} from "react-icons/pi";

const CourseStat = ({
                        status,
                        studentCount,
                        countEpisode,time
                    }: any) => {
    return (
        <div
            className="mt-5 hidden lg:grid  grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2">

            <div className="flex items-center gap-2 border rounded-lg p-3">
                <BsInfoCircle size={30} className="text-primary"/>
                <div>
                    <div className="font-bold text-sm">{status}</div>
                    <div className={"text-sm"}>وضعیت دوره</div>
                </div>
            </div>
            <div className="flex items-center gap-2 border rounded-lg p-3">
                <MdOutlineOndemandVideo size={30} className="text-primary"/>

                <div>
                    <div className="text-sm font-bold">{countEpisode}</div>
                    <div className={"text-sm"}>تعداد جلسات</div>
                </div>
            </div>

            <div className="flex items-center gap-2 border rounded-lg p-3">
                <IoTimeOutline size={30} className="text-primary"/>

                <div>
                    <div className="text-sm font-bold">{time}</div>
                    <div className={"text-sm"}>مدت زمان</div>
                </div>
            </div>

            <div className="flex items-center gap-2 border rounded-lg p-3">
                <PiGraduationCapThin size={30} className="text-primary"/>

                <div>
                    <div className="text-sm font-bold">{studentCount}</div>
                    <div className={"text-sm"}>دانشجو</div>
                </div>
            </div>


            {/*<div className="flex items-center gap-2 border rounded-lg p-3">*/}
            {/*    <LiaCommentsSolid size={30} className="text-primary"/>*/}

            {/*    <div>*/}
            {/*        <div className="text-sm font-bold">{commentCount}</div>*/}
            {/*        <div className={"text-sm"}>دیدگاه</div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default CourseStat;