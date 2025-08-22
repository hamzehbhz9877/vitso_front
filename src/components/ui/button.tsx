import * as React from "react"
import {Slot} from "@radix-ui/react-slot"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "@/lib/utils"
import {LuLoaderCircle} from "react-icons/lu";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all" +
    "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring " +
    "disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0" +
    "aria-invalid:border-destructive " +
    "outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
    {
        variants: {
            variant: {
                // default:
                //     "bg-neutral-900 text-neutral-50  hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90",
                    default:
                        " bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3",
                destructive:
                    "bg-red-500 text-neutral-50  hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
                outline:
                    "border border-neutral-200 bg-white  hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
                secondary:
                    "bg-neutral-100 text-neutral-900  hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",
                ghost: "hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
                link: "text-neutral-900 underline-offset-4 hover:underline dark:text-neutral-50",



                // default: "text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
                defaultOutline: "text-blue-700 border border-blue-700 bg-transparent hover:bg-blue-50 focus:ring-4 focus:ring-blue-100 rounded-full text-sm px-5 py-2.5   dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-800 dark:hover:text-white dark:focus:ring-blue-800",

                alternative: "py-2.5 px-5   text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",
                alternativeOutline: "text-gray-700 border border-gray-300 bg-transparent hover:bg-gray-100 hover:text-black rounded-full text-sm px-5 py-2.5   dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700",

                dark: "text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5   dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700",
                darkOutline: "text-gray-800 border border-gray-800 bg-transparent hover:bg-gray-800 hover:text-white focus:ring-4 focus:ring-gray-200 rounded-full text-sm px-5 py-2.5   dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700",

                light: "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5   dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700",
                lightOutline: "text-gray-900 border border-gray-300 bg-transparent hover:bg-gray-100 rounded-full text-sm px-5 py-2.5   dark:text-white dark:border-gray-600 dark:hover:bg-gray-700",

                green: "text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center   dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
                greenOutline: "text-green-700 border border-green-700 bg-transparent hover:bg-green-100 focus:ring-4 focus:ring-green-200 rounded-full text-sm px-5 py-2.5   dark:text-green-400 dark:border-green-400 dark:hover:bg-green-700 dark:hover:text-white dark:focus:ring-green-800",

                red: "text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center   dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900",
                // secondary: "text-red-700 border border-red-700 bg-transparent hover:bg-red-100 focus:ring-4 focus:ring-red-200 rounded-full text-sm px-5 py-2.5   dark:text-red-400 dark:border-red-400 dark:hover:bg-red-700 dark:hover:text-white dark:focus:ring-red-800",

                yellow: "text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center   dark:focus:ring-yellow-900",
                yellowOutline: "text-yellow-600 border border-yellow-400 bg-transparent hover:bg-yellow-100 focus:ring-4 focus:ring-yellow-200 rounded-full text-sm px-5 py-2.5   dark:text-yellow-400 dark:border-yellow-400 dark:hover:bg-yellow-600 dark:hover:text-white dark:focus:ring-yellow-800",

                purple: "text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center  dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900",
                purpleOutline: "text-purple-700 border border-purple-700 bg-transparent hover:bg-purple-100 focus:ring-4 focus:ring-purple-200 rounded-full text-sm px-5 py-2.5  dark:text-purple-400 dark:border-purple-400 dark:hover:bg-purple-700 dark:hover:text-white dark:focus:ring-purple-900",

            },
            size: {
                default: "h-9 px-4 py-2 rounded-[4px]",
                sm: "h-8 rounded-[4px] px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9 rounded-full",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
    isPending?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, variant, size,isPending=false, asChild = false, ...props}, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn("m-0 cursor-pointer",buttonVariants({variant, size, className}))}
                ref={ref}
                {...props}
            >
                {props.children}
                <LuLoaderCircle className={`${(isPending||props.disabled)?"opacity-100 static":"opacity-0 absolute"} animate-spin`} />
            </Comp>
        )
    }
)
Button.displayName = "Button"

export {Button, buttonVariants}
