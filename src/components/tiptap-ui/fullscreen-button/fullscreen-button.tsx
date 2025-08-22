"use client"

import * as React from "react"
import { Button, ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Maximize2, Minimize2 } from "lucide-react"
import {useEffect} from "react";

export interface FullscreenButtonProps extends Omit<ButtonProps, "type" | "onToggle"> {
    /**
     * Optional callback when fullscreen toggles.
     */
    onToggle?: (isFullscreen: boolean) => void
    /**
     * Optional initial fullscreen state.
     * @default false
     */
    initialFullscreen?: boolean
    /**
     * Optional tooltip text.
     */
    tooltip?: string
}

export const FullscreenButton = React.forwardRef<HTMLButtonElement, FullscreenButtonProps>(
    ({ onToggle, initialFullscreen = false, tooltip = "تمام‌صفحه", ...buttonProps }, ref) => {
        const [isFullscreen, setIsFullscreen] = React.useState(initialFullscreen)

        const handleClick = React.useCallback(
            (event: React.MouseEvent<HTMLButtonElement>) => {
                setIsFullscreen(prev => {
                    const next = !prev
                    onToggle?.(next)
                    return next
                })
            },
            [onToggle]
        )


        useEffect(() => {
            setIsFullscreen(initialFullscreen)
        }, [initialFullscreen]);

        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            type="button"
                            data-style="ghost"
                            data-active-state={isFullscreen ? "on" : "off"}
                            aria-pressed={isFullscreen}
                            onClick={handleClick}
                            {...buttonProps}
                            ref={ref}
                        >
                            {isFullscreen ? <Minimize2 className="tiptap-button-icon" /> : <Maximize2 className="tiptap-button-icon" />}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">{tooltip}</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        )
    }
)

FullscreenButton.displayName = "FullscreenButton"
