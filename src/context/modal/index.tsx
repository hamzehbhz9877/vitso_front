'use client';

import React, { createContext, ReactNode } from "react";
import { Modal } from "@/components/modal";
import useModal from "@/hooks/useModal";

type ModalContextType = {
    openModal: (data: React.ReactNode, options?: any) => void;
    closeModal: () => void;
    backToPrevModal: () => void;
};

export const ModalProvider = createContext({} as ModalContextType);

type Props = { children: ReactNode };

const ModalContext = ({ children }: Props) => {
    const { isModalOpen, modals, handleOpen, handleClose,backToPrevModal} = useModal();

    return (
        <ModalProvider.Provider value={{ openModal: handleOpen, closeModal: handleClose,backToPrevModal }}>
            {children}
            {modals.map((modal, index) => (
                <Modal
                    key={modal.id}
                    options={modal.options}
                    showModal={index===modals.length - 1}
                    close={handleClose}
                >
                    {modal.data}
                </Modal>
            ))}
        </ModalProvider.Provider>
    );
};

export default ModalContext;
