'use client'

import React from 'react';
import Episode from "@/app/(main)/course/_components/episode";
import SeasonHeader from "@/app/(main)/course/_components/seasonHeader";

const Seasons = ({title, episodes, index,duration}: Season & { index: number }) => {
    return (
        <div className="bg-base-100 text-base-content  dark:border-white/20 border-base-300 collapse collapse-arrow border">
            <SeasonHeader index={index} duration={duration} title={title} episodes={episodes}/>
            <div className="collapse-content !p-0">
                {episodes.map((episode, index) => (
                    <Episode key={episode.id} {...episode} index={index}/>
                ))}
            </div>
        </div>
    );
};

export default Seasons;