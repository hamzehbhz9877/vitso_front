import React from 'react';
import {cn} from "@/lib/utils";

const SeasonHeader = ({index,title,episodes,duration}:any) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <>
            <input type="checkbox" className="peer" checked={isOpen} onChange={(e) => setIsOpen(e.target.checked)}/>
            <div
                className="collapse-title flex items-center justify-between
            dark:peer-checked:bg-[#0a97d41a]
            peer-checked:bg-[rgb(100,116,139)]
            group peer-checked:text-white"
            >
                <div className="flex items-center gap-4 peer-checked:bg-red">
                    {/*<div className={cn("rounded-[6px] flex season-count text-primary ",isOpen&&"text-white")}>*/}
                    {/*    {index + 1}*/}
                    {/*</div>*/}
                    <span className="group-peer-checked:text-white">{title}</span>
                </div>
                <div className="flex gap-2">
                    <div className="badge badge-soft py-4 badge-info">{episodes.length + " جلسه"}</div>
                    <div className="badge badge-soft py-4 badge-info">{duration}</div>
                </div>
            </div>

        </>
    );
};

export default SeasonHeader;