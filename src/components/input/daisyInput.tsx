import React from "react";
import {cn} from "@/lib/utils";

const DaisyInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className,type, ...props },ref) => {
        return <input
            type={type}
            className={cn("input input-bordered focus:bg-transparent w-full",className)}
            ref={ref}
            {...props}
        />
    });

export default DaisyInput;