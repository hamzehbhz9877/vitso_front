"use client"

import * as React from "react"
import {
    Calculator,
    Calendar,
    CreditCard, Search,
    Settings,
    Smile,
    User,
} from "lucide-react"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import LightIcon from "next/dist/client/components/react-dev-overlay/ui/icons/light-icon";
import DarkIcon from "next/dist/client/components/react-dev-overlay/ui/icons/dark-icon";

export function CommandDialogDemo() {
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <>
            <Button
                data-sidebar="trigger"
                variant="ghost"
                size="icon"
                className={cn("h-7 w-7 ","flex lg:hidden")}
                onClick={(event) => {
                    setOpen(true)
                }}
            >
                <Search/>
                <span className="sr-only">general search</span>
            </Button>
            <div className={"relative cursor-pointer hidden lg:block"} onClick={() => setOpen(true)}>
                <kbd
                    className="bg-muted absolute top-1/2 -translate-y-1/2 left-2 text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
                    <span className="text-xs">⌘</span>J
                </kbd>
                <Input type={"text"} className={"pointer-events-none  w-70"} readOnly/>

                <Search size={18} className={"absolute top-1/2 -translate-y-1/2 right-2 text-muted-foreground pointer-events-none select-none"}/>
            </div>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput  placeholder="Type a command or search..."/>
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>
                            <Calendar />
                            <span>Calendar</span>
                        </CommandItem>
                        <CommandItem>
                            <Smile />
                            <span>Search Emoji</span>
                        </CommandItem>
                        <CommandItem>
                            <Calculator />
                            <span>Calculator</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                        <CommandItem>
                            <User />
                            <span>Profile</span>
                            <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <CreditCard />
                            <span>Billing</span>
                            <CommandShortcut>⌘B</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <Settings />
                            <span>Settings</span>
                            <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
