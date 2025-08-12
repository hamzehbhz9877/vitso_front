'use client'

import React, {ReactNode} from 'react';
import './index.css'

type ModalProps = {
    options?: any
    className?: string
    showModal: boolean;
    close: () => void;
    children: ReactNode;
    isLoadingOverlay?: boolean
}

export const Modal = ({children, close, className, showModal, options, isLoadingOverlay}: ModalProps) => {

        return (
            <div className={`custom-modal-slide ${showModal ? "custom-modal-slide--active" : ""}`}>
                <div className={[`custom-modal-overlay ${showModal ? "custom-modal-overlay--active" : ""}`, className,].join(' ')}
                     onClick={close}>
                    <div className={['custom-modal', options?.className].join(' ')} onClick={e => e.stopPropagation()}>
                        {/*{options?.title && <div className="modal__header">*/}
                        {/*    <h3>{options?.title}</h3>*/}
                        {/*    <IoMdClose color={"#555"} onClick={close} role="button" width={30} height={30}/>*/}
                        {/*</div>}*/}
                        {/*<div className="flex justify-end title">*/}
                        {/*    <IoMdClose color={"#555"} onClick={close} role="button" size={23}/>*/}
                        {/*</div>*/}
                        {children}
                        {isLoadingOverlay && <div className="loading-overlay">
                            ...loading
                        </div>
                        }
                    </div>
                </div>

            </div>

        );
    }
;

type Props = {
    children: ReactNode
}
const ModalHeader = ({children}: Props) => {
    return <div className="custom-modal__header">{children}</div>;
};
const ModalBody = ({children}: Props) => {
    return <div className="custom-modal__body">{children}</div>;
};
const ModalFooter = ({children, align = "center"}: Props & { align: 'right' | 'center' | 'left' }) => {
    return <div className={`custom-modal__footer text-${align}`}>{children}</div>;
};

export {ModalHeader, ModalBody, ModalFooter};