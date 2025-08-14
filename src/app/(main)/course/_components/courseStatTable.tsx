import React from 'react';
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { PiGraduationCapThin } from "react-icons/pi";

const CourseStatTable = ({
                        status,
                        studentCount,
                        countEpisode,
                        time
                    }: any) => {
    return (
        <div className="overflow-x-auto rounded-lg block lg:hidden">
            <table className="table w-full">
                <tbody className={"bg-base-200"}>
                <tr>
                    <td className={"flex gap-2"}><BsInfoCircle size={24} className="text-primary" />وضعیت دوره</td>
                    <td className="font-bold">{status}</td>
                </tr>
                <tr>
                    <td className={"flex gap-2"}><MdOutlineOndemandVideo size={24} className="text-primary" />تعداد جلسات</td>
                    <td className="font-bold">{countEpisode}</td>
                </tr>
                <tr>
                    <td className={"flex gap-2"}><IoTimeOutline size={24} className="text-primary" />مدت زمان</td>
                    <td className="font-bold">{time}</td>
                </tr>
                <tr>
                    <td className={"flex gap-2"}><PiGraduationCapThin size={24} className="text-primary" />دانشجو</td>
                    <td className="font-bold">{studentCount}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CourseStatTable;
