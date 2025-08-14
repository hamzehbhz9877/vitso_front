'use client';

import React, { createContext, ReactNode } from "react";
import useModal from "@/hooks/useModal";
import {Dialog} from "@/components/ui/dialog";
import Modal from '@/context/modal/index'

type ModalContextType = {
    openModal: (data: React.ReactNode, options?: any) => void;
    closeModal: () => void;
    backToPrevModal: () => void;
};

export const ModalProvider = createContext({} as ModalContextType);

type Props = { children: ReactNode };

const ModalContext = ({ children }: Props & any) => {
    const { isModalOpen, modals, handleOpen, handleClose,backToPrevModal} = useModal();

    return (
        <ModalProvider.Provider value={{ openModal: handleOpen, closeModal: handleClose,backToPrevModal }}>
            {children}
            {modals.map((modal, index) => (
                <Dialog
                    key={modal.id}
                    open={index === modals.length - 1 && isModalOpen}
                    onOpenChange={(open) => !open && handleClose()}
                >
                    {modal.data}
                </Dialog>
            ))}
        </ModalProvider.Provider>
    );
};

export default ModalContext;
