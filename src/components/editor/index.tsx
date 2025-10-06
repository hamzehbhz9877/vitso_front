'use client'

import * as React from "react"
import {useEditor, EditorContent} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import {Image} from '@tiptap/extension-image'
import {Link} from '@tiptap/extension-link'
import {TaskItem} from '@tiptap/extension-task-item'
import {Underline} from '@tiptap/extension-underline'
import {Superscript} from '@tiptap/extension-superscript'
import {Subscript} from '@tiptap/extension-subscript'
import {TextAlign} from '@tiptap/extension-text-align'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import {Table} from '@tiptap/extension-table'
import "@/components/tiptap-ui/table-button/index.scss"
import HeadingDropdownMenu from "@/components/tiptap-ui/heading-dropdown-menu/heading-dropdown-menu"
import {ImageUploadButton} from '@/components/tiptap-ui/image-upload-button'
import {ImageUploadNode} from '@/components/tiptap-node/image-upload-node'
import {handleImageUpload, MAX_FILE_SIZE} from '@/lib/tiptap-utils'
import {LinkPopover} from '@/components/tiptap-ui/link-popover'
import {Toolbar, ToolbarGroup, ToolbarSeparator} from "@/components/tiptap-ui-primitive/toolbar"
import {MarkButton} from '@/components/tiptap-ui/mark-button'
import {TextAlignButton} from '@/components/tiptap-ui/text-align-button'
import {FullscreenButton} from "@/components/tiptap-ui/fullscreen-button"
import {ListDropdownMenu} from "@/components/tiptap-ui/list-dropdown-menu"

import '@/components/tiptap-node/image-upload-node/image-upload-node.scss'
import '@/components/tiptap-node/code-block-node/code-block-node.scss'
import '@/components/tiptap-node/list-node/list-node.scss'
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss'

import {useEffect, useRef, useState} from "react"
import {cn} from "@/lib/utils"
import {useDisableBodyScroll} from "@/hooks/useDisableBodyScroll/useDisableBodyScroll"
import {PageSize, PageSizeDropdown} from "../tiptap-ui/responsive-button";
import Placeholder from "@tiptap/extension-placeholder";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import {TableButton} from "@/components/tiptap-ui/table-button/table";
import {motion} from "framer-motion";
import {Toggle} from "@/components/ui/toggle";
import {
    AlignCenter,
    AlignLeft,
    AlignRight,
    Bold,
    ChevronDown, Columns, Eraser,
    Italic,
    Merge,
    PaintBucket, Redo2,
    Rows,
    Split, Trash2, Undo2
} from "lucide-react";

import {Separator} from "@/components/ui/separator";

import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {DeleteColumnIcon, DeleteRowIcon} from "@/components/tiptap-ui/table-button/deleteIcons";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut,
    ContextMenuTrigger
} from "@/components/ui/context-menu";
import {Skeleton} from "@/components/ui/skeleton";


// ---- Color Swatches
const COLOR_SWATCHES = [
    "#ffffff",
    "#fef3c7",
    "#fde68a",
    "#bbf7d0",
    "#a7f3d0",
    "#bae6fd",
    "#c7d2fe",
    "#fbcfe8",
    "#e5e7eb",
];
// ---- Utility: Persian labels
export const fa = {
    insertTable: "افزودن جدول",
    tableSize: "اندازه جدول",
    rows: "سطر",
    cols: "ستون",
    formatting: "قالب‌بندی",
    row: "سطر",
    col: "ستون",
    delete: "حذف",
    headerRow: "سطر تیتر",
    headerCol: "ستون تیتر",
    headerCell: "سلول تیتر",
    merge: "ادغام",
    split: "تفکیک",
    addRowBefore: "افزودن سطر قبل",
    addRowAfter: "افزودن سطر بعد",
    addColBefore: "افزودن ستون قبل",
    addColAfter: "افزودن ستون بعد",
    deleteRow: "حذف سطر",
    deleteCol: "حذف ستون",
    deleteTable: "حذف جدول",
    cellOptions: "تنظیمات سلول",
    bgColor: "رنگ پس‌زمینه",
    clearBg: "حذف رنگ",
    alignment: "تراز متن",
};

function ColorSwatches({onSelect}: { onSelect: (hex: string | null) => void }) {
    return (
        <div className="flex flex-wrap gap-2">
            {COLOR_SWATCHES.map((hex) => (
                <button
                    key={hex}
                    onClick={() => onSelect(hex)}
                    className="h-6 w-6 rounded border"
                    style={{backgroundColor: hex}}
                    aria-label={`pick ${hex}`}
                />
            ))}
            <Button type={"button"} variant="ghost" size="sm" onClick={() => onSelect(null)}>
                <Eraser className="h-4 w-4 mr-1"/> {fa.clearBg}
            </Button>
        </div>
    );
}

export default function TiptapEditor({
                                         uploadUrl,
                                         defaultData,
                                         getEditorData,
                                         name
                                     }: {
    defaultData?: string,
    name?: string,
    uploadUrl?: string,
    getEditorData: (data: string, text: string) => void
}) {
    const [isFullscreen, setIsFullscreen] = useState(false)


    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: false,
                orderedList: false,
                listItem: false,
            }),
            Placeholder.configure({placeholder: "برای شروع تایپ کنید…"}),
            BulletList,
            OrderedList,
            ListItem,
            Heading.configure({levels: [1, 2, 3, 4, 5, 6]}),
            Image,
            ImageUploadNode.configure({
                accept: 'image/*',
                maxSize: MAX_FILE_SIZE,
                limit: 3,
                upload: handleImageUpload(uploadUrl),
                onError: (error) => console.error('Upload failed:', error),
            }),
            Link.configure({openOnClick: false}),
            TaskItem.configure({nested: true}),
            Underline,
            Superscript,
            Subscript,
            TextAlign.configure({types: ['heading', 'paragraph']}),
            Table.configure({
                resizable: true, // اختیاری: برای تغییر اندازه ستون‌ها
            }),
            TableRow,
            TableHeader,
            TableCell.extend({
                addAttributes() {
                    return {
                        ...this.parent?.(),
                        backgroundColor: {
                            default: null,
                            parseHTML: (element) => element.getAttribute("data-bg") || null,
                            renderHTML: (attributes) => {
                                if (!attributes.backgroundColor) return {};
                                return {
                                    "data-bg": attributes.backgroundColor,
                                    style: `background-color: ${attributes.backgroundColor}`
                                };
                            },
                        },
                    };
                },
            }),
        ],
        content: defaultData,
        onUpdate({editor}) {
            getEditorData(editor.getHTML(), editor.getText())
        },
        immediatelyRender: false,
    })
    const editorRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (editor && defaultData) {
            editor.commands.setContent(defaultData);
        }
    }, [editor, defaultData]);
    const [showMenu, setShowMenu] = useState(false);
    const [menuStyle, setMenuStyle] = useState<{ top: number }>({
        top: 0,
    });
    const tableRef = useRef<HTMLTableElement | null>(null);
    const floatingMenuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (tableRef.current && (target.closest('td') || target.closest('th'))) {
                const clickedCell = target.closest('td, th')!;
                const editorRect = editorRef.current!.getBoundingClientRect();
                const cellRect = clickedCell.getBoundingClientRect();

                setMenuStyle({
                    top: cellRect.bottom - editorRect.top + 3,
                });
                setShowMenu(true);
            } else if (floatingMenuRef.current && floatingMenuRef.current.contains(target)) {
                return;
            } else {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    useDisableBodyScroll([isFullscreen])

    const [size, setSize] = React.useState<PageSize>("desktop")

    if (!editor) {
        return < div
            className = "space-y-4 border p-4 rounded-md bg-background shadow-sm" >
            < div
                className = "flex flex-wrap gap-2" >
                {/* Toolbar buttons */}
                {
                    Array.from({length: 8}).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-8 rounded"/>
                    ))
                }
                <Skeleton className="h-8 w-24 rounded"/>
            </div>

            {/* Editor content area */
            }
            <div className="space-y-3 mt-4">
                <Skeleton className="h-6 w-3/4"/>
                <Skeleton className="h-4 w-full"/>
                <Skeleton className="h-4 w-5/6"/>
                <Skeleton className="h-4 w-2/3"/>
                <Skeleton className="h-4 w-3/4"/>
            </div>
        </div>
    }

    return (
        <div
            className={cn(
                "space-y-4 border p-3 relative transition-all",
                isFullscreen && "fixed inset-0 z-50 w-screen h-screen p-6 bg-background"
            )}
        >
            <Toolbar variant="floating" className="bg-background !overflow-x-auto overflow-y-auto">


                <ToolbarGroup>
                    <HeadingDropdownMenu tooltip="عناوین" levels={[1, 2, 3, 4, 5, 6]} editor={editor}/>
                    <ListDropdownMenu
                        tooltip="لیست"
                        editor={editor}
                        types={['bulletList', 'orderedList', 'taskList']}
                    />
                    <TableButton tooltip={"جدول"} editor={editor}/>
                </ToolbarGroup>

                <ToolbarSeparator/>

                <ToolbarGroup>
                    <MarkButton tooltip="بولد" editor={editor} type="bold"/>
                    <MarkButton tooltip="مورب" editor={editor} type="italic"/>
                    <MarkButton tooltip="زیرخط‌دار" editor={editor} type="underline"/>
                    <MarkButton tooltip="خط خورده" editor={editor} type="strike"/>
                    <MarkButton tooltip="کد" editor={editor} type="code"/>
                    <MarkButton tooltip="بالانویس" editor={editor} type="superscript"/>
                    <MarkButton tooltip="پایین‌نویس" editor={editor} type="subscript"/>
                </ToolbarGroup>

                <ToolbarSeparator/>

                <ToolbarGroup>
                    <TextAlignButton editor={editor} align="right" tooltip="راست‌چین"/>
                    <TextAlignButton editor={editor} align="center" tooltip="میان‌چین"/>
                    <TextAlignButton editor={editor} align="justify" tooltip="تراز‌شده"/>
                    <TextAlignButton editor={editor} align="left" tooltip="چپ‌چین"/>
                </ToolbarGroup>

                <ToolbarSeparator/>
                <ToolbarGroup>
                    <ImageUploadButton editor={editor}/>
                    <LinkPopover tooltip="لینک" editor={editor}/>
                </ToolbarGroup>
                <ToolbarSeparator/>
                <ToolbarGroup>
                    <FullscreenButton
                        initialFullscreen={isFullscreen}
                        onClick={() => setIsFullscreen(prev => !prev)}
                    />
                </ToolbarGroup>

                {isFullscreen ?
                    <div className={"hidden 2xl:block"}>
                        <ToolbarSeparator/>
                        <ToolbarGroup>
                            <PageSizeDropdown
                                editor={editor!}
                                value={size}
                                onChange={setSize}
                            />
                        </ToolbarGroup>
                        {/*<ToolbarSeparator />*/}
                        {/*<ToolbarGroup>*/}
                        {/*    <Button type={"button} size="sm" variant="ghost" onClick={() => editor.chain().focus().undo().run()}>*/}
                        {/*        <Undo2 className="h-4 w-4"/>*/}
                        {/*    </Button>*/}
                        {/*    <Button type={"button} size="sm" variant="ghost" onClick={() => editor.chain().focus().redo().run()}>*/}
                        {/*        <Redo2 className="h-4 w-4"/>*/}
                        {/*    </Button>*/}
                        {/*</ToolbarGroup>*/}

                    </div> : ""}
            </Toolbar>

            <ContextMenu>
                <ContextMenuTrigger onContextMenu={(e) => {
                    if (!(editor.isActive("tableCell") || editor.isActive("tableHeader"))) {
                        e.preventDefault();
                    }
                }}>
                    <div className={cn("relative mx-auto", isFullscreen && "prose-fullscreen",
                        isFullscreen ? size === "default" ? "w-full" : size === "desktop" ? "w-[926px]" :
                            size === "tablet" ? "w-[736px]" : size === "mobile" ? "w-[343px]" : "w-auto" : "w-auto")}
                         ref={tableRef}
                    >
                        <EditorContent ref={editorRef}
                                       editor={editor}
                                       className={cn(
                                           "prose prose-sm  text-right h-full overflow-auto mx-auto",
                                       )}
                        />
                        <div id="floating-menu">
                            {showMenu && (
                                <motion.div
                                    ref={floatingMenuRef}
                                    initial={{opacity: 0, scale: 0.95}}
                                    animate={{opacity: 1, scale: 1}}
                                    className="absolute border bg-popover p-2 shadow-xl z-50 w-auto"
                                    style={{
                                        top: menuStyle.top,
                                        left: 0,
                                        right: 0,
                                        maxWidth: '100%',
                                    }}
                                    onMouseDown={e => e.stopPropagation()}
                                >
                                    <div className="flex flex-wrap gap-1 items-center justify-start sm:justify-center">
                                        <Toggle
                                            pressed={editor.isActive('bold')}
                                            onPressedChange={() => editor.chain().focus().toggleBold().run()}
                                            aria-label="bold"
                                        >
                                            <Bold className="h-4 w-4"/>
                                        </Toggle>

                                        <Toggle
                                            pressed={editor.isActive('italic')}
                                            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
                                            aria-label="italic"
                                        >
                                            <Italic className="h-4 w-4"/>
                                        </Toggle>

                                        <Separator orientation="vertical" className="mx-1 h-6 hidden sm:block"/>

                                        <div className="flex flex-wrap gap-1">
                                            <Button type={"button"}
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                                            >
                                                <AlignRight className="h-4 w-4"/>
                                            </Button>
                                            <Button type={"button"}
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                                            >
                                                <AlignCenter className="h-4 w-4"/>
                                            </Button>
                                            <Button type={"button"}
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                                            >
                                                <AlignLeft className="h-4 w-4"/>
                                            </Button>
                                        </div>

                                        <Separator orientation="vertical" className="mx-1 h-6 hidden sm:block"/>

                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button type={"button"} size="sm" variant="outline" className="gap-2">
                                                    <PaintBucket className="h-4 w-4"/> {fa.bgColor}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent align="end" className="w-full sm:w-56">
                                                <ColorSwatches
                                                    onSelect={(hex) => {
                                                        if (hex) editor.chain().focus().setCellAttribute('backgroundColor', hex).run();
                                                        else editor.chain().focus().resetAttributes('tableCell', 'backgroundColor').run();
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>

                                        <Separator orientation="vertical" className="mx-1 h-6 hidden sm:block"/>

                                        <Button type={"button"} size="sm" variant="outline"
                                                onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
                                            {fa.headerCell}
                                        </Button>

                                        {/*<DropdownMenu>*/}
                                        {/*    <DropdownMenuTrigger asChild>*/}
                                        {/*        <Button type={"button"} size="sm" variant="outline" className="gap-2">*/}
                                        {/*            {fa.cellOptions} <ChevronDown className="h-4 w-4"/>*/}
                                        {/*        </Button>*/}
                                        {/*    </DropdownMenuTrigger>*/}
                                        {/*    <DropdownMenuContent onMouseDown={e => e.stopPropagation()} align="start"> <DropdownMenuItem*/}
                                        {/*        onClick={() => editor.chain().focus().mergeCells().run()}> <Merge*/}
                                        {/*        className="h-4 w-4 mr-2"/> {fa.merge} </DropdownMenuItem>*/}
                                        {/*        <DropdownMenuItem*/}
                                        {/*            onClick={() => editor.chain().focus().splitCell().run()}> <Split*/}
                                        {/*            className="h-4 w-4 mr-2"/> {fa.split} </DropdownMenuItem>*/}
                                        {/*        <DropdownMenuSeparator/> <DropdownMenuItem*/}
                                        {/*            onClick={() => editor.chain().focus().addRowBefore().run()}>*/}
                                        {/*            <Rows className="h-4 w-4 mr-2"/> {fa.addRowBefore}*/}
                                        {/*        </DropdownMenuItem> <DropdownMenuItem*/}
                                        {/*            onClick={() => editor.chain().focus().addRowAfter().run()}>*/}
                                        {/*            <Rows className="h-4 w-4 mr-2"/> {fa.addRowAfter}*/}
                                        {/*        </DropdownMenuItem> <DropdownMenuItem*/}
                                        {/*            onClick={() => editor.chain().focus().addColumnBefore().run()}>*/}
                                        {/*            <Columns className="h-4 w-4 mr-2"/> {fa.addColBefore}*/}
                                        {/*        </DropdownMenuItem> <DropdownMenuItem*/}
                                        {/*            onClick={() => editor.chain().focus().addColumnAfter().run()}>*/}
                                        {/*            <Columns className="h-4 w-4 mr-2"/> {fa.addColAfter}*/}
                                        {/*        </DropdownMenuItem> <DropdownMenuSeparator/> <DropdownMenuItem*/}
                                        {/*            className="text-destructive"*/}
                                        {/*            onClick={() => editor.chain().focus().deleteTable().run()}>*/}
                                        {/*            <Trash2 className="h-4 w-4 mr-2"/> {fa.deleteTable}*/}
                                        {/*        </DropdownMenuItem> </DropdownMenuContent>*/}
                                        {/*</DropdownMenu>*/}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                        {editor && (editor.isActive('tableCell') || editor.isActive('tableHeader')) &&
                            <ContextMenuContent>
                                <ContextMenuLabel>{fa.cellOptions}</ContextMenuLabel>
                                <ContextMenuSeparator/>
                                <ContextMenuItem onClick={() => editor.chain().focus().toggleHeaderCell().run()}>
                                    <Bold className="h-4 w-4 mr-2"/> {fa.headerCell}
                                </ContextMenuItem>
                                <ContextMenuItem onClick={() => editor.chain().focus().mergeCells().run()}>
                                    <Merge className="h-4 w-4 mr-2"/> {fa.merge}
                                </ContextMenuItem>
                                <ContextMenuItem onClick={() => editor.chain().focus().splitCell().run()}>
                                    <Split className="h-4 w-4 mr-2"/> {fa.split}
                                </ContextMenuItem>
                                <ContextMenuSeparator/>
                                <ContextMenuItem onClick={() => editor.chain().focus().addRowBefore().run()}>
                                    <Rows className="h-4 w-4 mr-2"/> {fa.addRowBefore}
                                </ContextMenuItem>
                                <ContextMenuItem onClick={() => editor.chain().focus().addRowAfter().run()}>
                                    <Rows className="h-4 w-4 mr-2"/> {fa.addRowAfter}
                                </ContextMenuItem>
                                <ContextMenuItem onClick={() => editor.chain().focus().addColumnBefore().run()}>
                                    <Columns className="h-4 w-4 mr-2"/> {fa.addColBefore}
                                </ContextMenuItem>
                                <ContextMenuItem onClick={() => editor.chain().focus().addColumnAfter().run()}>
                                    <Columns className="h-4 w-4 mr-2"/> {fa.addColAfter}
                                </ContextMenuItem>
                                <ContextMenuSeparator/>
                                <ContextMenuItem onClick={() => editor.chain().focus().deleteRow().run()}>
                                    <DeleteRowIcon/>
                                    {fa.deleteRow}

                                </ContextMenuItem>
                                <ContextMenuItem onClick={() => editor.chain().focus().deleteColumn().run()}>
                                    <DeleteColumnIcon/> {fa.deleteCol}
                                </ContextMenuItem>
                                <ContextMenuItem onClick={() => editor.chain().focus().deleteTable().run()}
                                                 className="text-destructive">
                                    <Trash2 className="h-4 w-4 mr-2"/> {fa.deleteTable}
                                    <ContextMenuShortcut>⌫</ContextMenuShortcut>
                                </ContextMenuItem>
                            </ContextMenuContent>}
                    </div>

                </ContextMenuTrigger>
            </ContextMenu>

        </div>
    )
}
