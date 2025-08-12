'use client'

import "./slideIn.scss"

import React from 'react';

const More = ({children,isOpen,moreRef}:any) => {
    return (
        <div className={`more ${isOpen ? 'open' : ''}`} ref={moreRef}>
            {children}
        </div>
    );
};

export default More;