'use client'

import * as React from "react"
import { Button, ButtonProps } from "@/components/tiptap-ui-primitive/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { TableIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { fa } from "@/components/editor"
import {ChevronDownIcon} from "@/components/tiptap-icons/chevron-down-icon";

interface TableButtonProps extends Omit<ButtonProps, "type"> {
    /**
     * Editor instant for tiptap Table
     */
    editor: any

    /**
     * Optional tooltip text
     * @optional
     */
    tooltip?: string
}

function TableSizePicker({ onPick }: { onPick: (r: number, c: number) => void }) {
    const [hovered, setHovered] = useState({ r: 0, c: 0 });
    const max = 10;

    return (
        <div>
            <div className="grid grid-cols-10 gap-0.5">
                {Array.from({length: max * max}).map((_, i) => {
                    const r = Math.floor(i / max) + 1
                    const c = (i % max) + 1
                    const active = r <= hovered.r && c <= hovered.c
                    return (
                        <button
                            key={i}
                            onMouseEnter={() => setHovered({r, c})}
                            onClick={() => onPick(hovered.r || 1, hovered.c || 1)}
                            className={cn(
                                "h-4  rounded border",
                                active ? "bg-primary/80 border-primary" : "bg-muted hover:bg-accent"
                            )}
                            aria-label={`${r}x${c}`}
                        />
                    )
                })}
            </div>
            <div className="text-sm text-muted-foreground text-center pt-1">
                {hovered.r || 1} × {hovered.c || 1}
            </div>
        </div>
    )
}

export const TableButton = React.forwardRef<HTMLButtonElement, TableButtonProps>(
    ({editor, ...buttonProps}, ref) => {
        const [open, setOpen] = useState(false)


        const addTable = (rows: number, cols: number) => {
            editor.chain().focus().insertTable({rows, cols, withHeaderRow: true}).run()
            setOpen(false)
        }

        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        data-style="ghost"
                        {...buttonProps}
                        ref={ref}
                        className="gap-2"
                    >
                        <TableIcon className="h-4 w-4" />
                        <ChevronDownIcon className="tiptap-button-dropdown-small" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-56">
                    <div className="space-y-3">
                        <div className="font-medium text-sm">{fa.tableSize}</div>
                        <TableSizePicker onPick={(r, c) => addTable(r, c)} />
                    </div>
                </PopoverContent>
            </Popover>
        )
    }
)

TableButton.displayName = "TableButton"
