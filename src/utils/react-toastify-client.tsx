"use client";

import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";

interface ToastProviderProps {
    children: React.ReactNode;
}

export default function ToastProvider({children}: ToastProviderProps) {
    const contextClass = {
        success: "bg-blue-600 text-white rounded-full px-2 py-1 text-sm font-bold dark:bg-blue-800 dark:text-white",
        error: "bg-red-600 text-white rounded-full px-2 py-1 text-sm font-bold dark:bg-red-800 dark:text-white",
        info: "bg-gray-600 text-white rounded-full px-2 py-1 text-sm font-bold dark:bg-gray-700 dark:text-white",
        warning: "bg-orange-400 text-white rounded-full px-2 py-1 text-sm font-bold dark:bg-orange-600 dark:text-white",
        default: "bg-indigo-600 text-white rounded-full px-2 py-1 text-sm font-bold dark:bg-indigo-800 dark:text-white",
        dark: "bg-gray-800 text-white rounded-full px-2 py-1 text-sm font-bold dark:bg-gray-900 dark:text-white"
    };

    return (
        <>
            {children}
            <ToastContainer
                toastClassName={(context) =>
                    context.defaultClassName+ " "+contextClass[context?.type || "default"]
                }
                // bodyClassName={() => "text-sm font-bYekan p-3"}
                position="top-right"
                rtl
                autoClose={3000}
            />
        </>
    );
}