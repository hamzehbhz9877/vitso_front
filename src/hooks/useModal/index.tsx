'use client';

import {ReactNode, useCallback, useState} from "react";

const useModal = () => {
    const [modals, setModals] = useState<{
        id: number,
        data: ReactNode,
        options?: any,
        preserveState?: boolean,
    }[]>([]);

    const handleOpen = useCallback((data: ReactNode, options?: any, preserveState = false) => {
        // document.body.style.overflowY = 'hidden';
        setModals(prev => [...prev, {id: Date.now(), data, options, preserveState}]);
    }, []);

    const handleClose = () => {
        // document.querySelector(".custom-modal-slide--active")?.classList.remove("custom-modal-slide--active");
        // document.querySelector(".custom-modal-overlay--active")?.classList.remove("custom-modal-overlay--active");
        // setTimeout(() => {
        //     setModals([]);
        //     document.body.style.overflowY = 'auto';
        // }, 300); // Close first modal after animation
        setModals([]);
    }

    const backToPrevModal = useCallback(() => {
        setModals(prev => prev.slice(0, -1));
    }, []);

    return {
        isModalOpen: modals.length > 0,
        modals,
        handleOpen,
        handleClose,
        backToPrevModal
    };
};

export default useModal;
