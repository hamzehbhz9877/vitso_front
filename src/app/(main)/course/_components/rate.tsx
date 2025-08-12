import React from 'react';

const Rate = ({commentCount}:Pick<Course, 'commentCount'>) => {
    return (
        <div className={"flex flex-col"}>
            <div className={"flex gap-1 items-center text-left"}>
                {/*<span*/}
                {/*    className={"flex rounded-lg gap-1 text-sm items-center bg-gray-400 font-bold text-[13px] px-[4px] text-base-100"}>*/}
                {/*    <input type="radio" name="rating-2" className="mask mask-star-2 bg-white"  aria-label="1 star"/>*/}
                {/*    2.3*/}
                {/*</span>*/}
                {/*<div className={"w-1 h-1 rounded-full bg-gray-300"}></div>*/}
                <span className={"font-bold text-[13px] text-c-primary text-sm text-nowrap"}>{commentCount} رای</span>
            </div>
        </div>
    );
};

export default Rate;