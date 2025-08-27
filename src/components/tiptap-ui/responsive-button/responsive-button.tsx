"use client"

import * as React from "react"
import { type Editor } from "@tiptap/react"
import { useTiptapEditor } from "@/hooks/use-tiptap-editor"
import { ChevronDownIcon } from "@/components/tiptap-icons/chevron-down-icon"
import { Button, ButtonGroup } from "@/components/tiptap-ui-primitive/button"
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/tiptap-ui-primitive/dropdown-menu"
import { Card, CardBody } from "@/components/tiptap-ui-primitive/card"
import {FaDesktop, FaTablet, FaPhone, FaTabletAlt, FaTv} from "react-icons/fa"
import {CiMobile3} from "react-icons/ci";
import {AiOutlineColumnWidth} from "react-icons/ai";


export type PageSize = "default" | "desktop" | "tablet" | "mobile"

export const pageSizeOptions: { label: string; value: PageSize; icon: React.ElementType }[] = [
    { label: "تمام صفحه", value: "default", icon: AiOutlineColumnWidth  },
    { label: "دسکتاپ", value: "desktop", icon: FaDesktop },
    { label: "تبلت", value: "tablet", icon: FaTabletAlt },
    { label: "موبایل", value: "mobile", icon: CiMobile3 },
]

export function useSizeState(editor: Editor | null, initial: PageSize = "desktop") {
    const [selected, setSelected] = React.useState<PageSize>(initial)

    const handleSelect = (value: PageSize) => {
        setSelected(value)
        if (editor) {
            const el = editor.options.element
            el.classList.remove("size-default", "size-desktop", "size-tablet", "size-mobile")
            el.classList.add(`size-${value}`)
        }
    }

    return { selected, handleSelect }
}

export interface PageSizeButtonProps {
    value: PageSize
    text: string
    onClick: (value: PageSize) => void
}

export function PageSizeButton({ value, text, onClick }: PageSizeButtonProps) {
    return (
        <Button type="button" data-style="ghost" onClick={() => onClick(value)}>
            {text}
        </Button>
    )
}

export interface PageSizeDropdownProps {
    editor?: Editor
    value?: PageSize
    onChange?: (value: PageSize) => void
    portal?: boolean
}

export function PageSizeDropdown({ editor: providedEditor, value = "default", onChange, portal = false }: PageSizeDropdownProps) {
    const { editor } = useTiptapEditor(providedEditor)
    const [isOpen, setIsOpen] = React.useState(false)
    const { selected, handleSelect } = useSizeState(editor, value)

    const canToggleAny = !!editor && editor.isEditable

    const Icon = pageSizeOptions.find(opt => opt.value === selected)?.icon ?? FaDesktop

    const handleSelectAndNotify = (val: PageSize) => {
        handleSelect(val)
        onChange?.(val)
        setIsOpen(false)
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    type="button"
                    data-style="ghost"
                    data-active-state={pageSizeOptions.some(opt => opt.value === selected) ? "on" : "off"}
                    role="button"
                    tabIndex={-1}
                    disabled={!canToggleAny}
                    data-disabled={!canToggleAny}
                    aria-label="انتخاب سایز صفحه"
                    tooltip="سایز صفحه"
                >
                    <Icon className="tiptap-button-icon" />
                    <ChevronDownIcon className="tiptap-button-dropdown-small" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" portal={portal}>
                <Card>
                    <CardBody>
                        <ButtonGroup>
                            {pageSizeOptions.map(option => {
                                const isSelected = selected === option.value
                                const OptionIcon = option.icon

                                return (
                                    <DropdownMenuItem key={option.value} asChild>
                                        <Button
                                            type="button"
                                            data-style="ghost"
                                            data-active-state={isSelected ? "on" : "off"}
                                            role="button"
                                            tabIndex={-1}
                                            aria-pressed={isSelected}
                                            onClick={() => handleSelectAndNotify(option.value)}
                                        >
                                            <OptionIcon className="tiptap-button-icon" />
                                            <span className="tiptap-button-text">{option.label}</span>
                                        </Button>
                                    </DropdownMenuItem>
                                )
                            })}
                        </ButtonGroup>
                    </CardBody>
                </Card>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default PageSizeDropdown
