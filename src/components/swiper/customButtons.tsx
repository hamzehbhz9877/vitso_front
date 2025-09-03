'use client';
import React, {RefObject} from "react";
import { LiaAngleLeftSolid,LiaAngleRightSolid } from "react-icons/lia";


type CustomButtons = {
    prevRef: RefObject<any> | null;
    nextRef: RefObject<any> | null;
    blogsBtn: boolean;
};


const CustomButtons = ({nextRef, prevRef}: CustomButtons) => {
    return (
        <div className="flex items-center slider__buttons">
            {
                nextRef ? <button aria-label={"right-angle"} className="swiper-button right bg-transparent " ref={prevRef}>
                    <LiaAngleRightSolid color={"#fff"} />

                </button> : ""
            }
            {prevRef ?
                <button aria-label={"left-angle"}  className="swiper-button left bg-transparent" ref={nextRef}>
                    <LiaAngleLeftSolid color={"#fff"}/>

                </button> : ""}
        </div>
    );
};

export default CustomButtons;