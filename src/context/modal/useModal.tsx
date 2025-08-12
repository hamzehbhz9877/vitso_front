'use client'
import { useContext as context } from "react";
import {ModalProvider} from "@/context/modal/index";

const UseModalContext = () => {
    return context(ModalProvider);
};

export default UseModalContext;