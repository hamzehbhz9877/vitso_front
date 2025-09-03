'use client'

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./index.scss"

import React, {useRef} from "react";
import {Swiper as SwiperJs} from "swiper/react";

import {Navigation, Pagination, Autoplay} from "swiper/modules";
import UseNextPrevSwiper from "@/hooks/swipper/useNextPrev";
import CustomButtons from "./customButtons";

import {SwiperOptions} from "swiper/types";


type swiperType = {
    children: React.ReactNode
    SwiperOptions?: SwiperOptions
    hasDots?: boolean
    hasNextPrevButton?: boolean
    blogsBtn?: boolean
    index?: number
}

const Swiper = ({
                    children,
                    index,
                    SwiperOptions,
                    hasNextPrevButton = true,
                    hasDots = true,
                    blogsBtn = false
                }: swiperType) => {
    const {
        nextRef, prevRef, setSwiper, swiper,
        afterInit
    } = UseNextPrevSwiper();
    const bulletRef = useRef(null);


    React.useEffect(() => {
        if (swiper && index!==undefined) {
            swiper.slideTo(index)
        }
    }, [index,swiper]);

    return (
        <div className="relative min-w-0 ">
            <SwiperJs
                modules={[Navigation, Pagination, Autoplay]}
                onAfterInit={afterInit}
                spaceBetween={18}
                updateOnWindowResize
                navigation={{prevEl: prevRef?.current, nextEl: nextRef?.current}}
                pagination={{clickable: true, el: bulletRef?.current}}
                onSwiper={setSwiper}
                className="swiper-slides banner-swiper"
                {...SwiperOptions}
            >
                {children}
            </SwiperJs>
            {hasDots ? <div
                className="swiper-pagination"
                ref={bulletRef}
            /> : ""}
            <div className="absolute inset-0 ">
                <CustomButtons
                    blogsBtn={blogsBtn}
                    // bulletRef={hasDots?bulletRef:null}
                    nextRef={hasNextPrevButton ? nextRef : null}
                    prevRef={hasNextPrevButton ? prevRef : null}
                />
            </div>
        </div>
    );
};

export default Swiper;