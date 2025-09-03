"use client"

import React, {Suspense} from 'react';
import {SwiperSlide} from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import Swiper from "@/components/swiper/swiper"


const Slider = ({data}: { data: Banner[] }) => {


    return (
        <div className="banner-slider">
            <Swiper hasNextPrevButton hasDots SwiperOptions={{
                autoplay: {
                    delay: 4000,
                },
                lazyPreloadPrevNext: 4
            }}>
                {data?.map(({title,id,image,link}, index) => <SwiperSlide key={id}>
                    <Link aria-label={title} href={link} target={"_blank"}>
                        <Image src={image} title={title}
                               alt={title}
                               priority width={0} height={0} layout={"responsive"}
                               className={"static w-full rounded-md"}/>
                    </Link>
                </SwiperSlide>)}
            </Swiper>
        </div>
    );
};

export default Slider