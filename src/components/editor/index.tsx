'use client'

import * as React from "react"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { TaskItem } from '@tiptap/extension-task-item'
import { Underline } from '@tiptap/extension-underline'
import { Superscript } from '@tiptap/extension-superscript'
import { Subscript } from '@tiptap/extension-subscript'
import { TextAlign } from '@tiptap/extension-text-align'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'

import HeadingDropdownMenu from "@/components/tiptap-ui/heading-dropdown-menu/heading-dropdown-menu"
import { ImageUploadButton } from '@/components/tiptap-ui/image-upload-button'
import { ImageUploadNode } from '@/components/tiptap-node/image-upload-node'
import { handleImageUpload, MAX_FILE_SIZE } from '@/lib/tiptap-utils'
import { LinkPopover } from '@/components/tiptap-ui/link-popover'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from "@/components/tiptap-ui-primitive/toolbar"
import { MarkButton } from '@/components/tiptap-ui/mark-button'
import { TextAlignButton } from '@/components/tiptap-ui/text-align-button'
import { FullscreenButton } from "@/components/tiptap-ui/fullscreen-button"
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu"

import '@/components/tiptap-node/image-upload-node/image-upload-node.scss'
import '@/components/tiptap-node/code-block-node/code-block-node.scss'
import '@/components/tiptap-node/list-node/list-node.scss'
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss'

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useDisableBodyScroll } from "@/hooks/useDisableBodyScroll/useDisableBodyScroll"
import { PageSize,PageSizeDropdown } from "../tiptap-ui/responsive-button";

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
            BulletList,
            OrderedList,
            ListItem,
            Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
            Image,
            ImageUploadNode.configure({
                accept: 'image/*',
                maxSize: MAX_FILE_SIZE,
                limit: 3,
                upload: handleImageUpload(uploadUrl),
                onError: (error) => console.error('Upload failed:', error),
            }),
            Link.configure({ openOnClick: false }),
            TaskItem.configure({ nested: true }),
            Underline,
            Superscript,
            Subscript,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: defaultData ?? '',
        onUpdate({ editor }) {
            getEditorData(editor.getHTML(), editor.getText())
        },
        immediatelyRender: false,
    })

    useEffect(() => {
        if (editor && defaultData) {
            editor.commands.setContent(defaultData)
        }
    }, [editor, defaultData])

    useDisableBodyScroll([isFullscreen])
    const [size, setSize] = React.useState<PageSize>("desktop")

    return (
        <div
            className={cn(
                "space-y-4 border p-3 relative transition-all",
                isFullscreen && "fixed inset-0 z-50 w-screen h-screen p-6 bg-background"
            )}
        >
            <Toolbar variant="floating" className="bg-background !overflow-x-auto overflow-y-auto">
                <ToolbarGroup>
                    <ImageUploadButton editor={editor} />
                    <LinkPopover  tooltip="لینک" editor={editor} />
                </ToolbarGroup>

                <ToolbarSeparator />

                <ToolbarGroup>
                    <HeadingDropdownMenu tooltip="عناوین" levels={[1, 2, 3, 4, 5, 6]} editor={editor} />
                    <ListDropdownMenu
                        tooltip="لیست"
                        editor={editor}
                        types={['bulletList', 'orderedList', 'taskList']}
                    />
                </ToolbarGroup>

                <ToolbarSeparator />

                <ToolbarGroup>
                    <MarkButton tooltip="بولد" editor={editor} type="bold" />
                    <MarkButton tooltip="مورب" editor={editor} type="italic" />
                    <MarkButton tooltip="زیرخط‌دار" editor={editor} type="underline" />
                    <MarkButton tooltip="خط خورده" editor={editor} type="strike" />
                    <MarkButton tooltip="کد" editor={editor} type="code" />
                    <MarkButton tooltip="بالانویس" editor={editor} type="superscript" />
                    <MarkButton tooltip="پایین‌نویس" editor={editor} type="subscript" />
                </ToolbarGroup>

                <ToolbarSeparator />

                <ToolbarGroup>
                    <TextAlignButton editor={editor} align="right" tooltip="راست‌چین" />
                    <TextAlignButton editor={editor} align="center" tooltip="میان‌چین" />
                    <TextAlignButton editor={editor} align="justify" tooltip="تراز‌شده" />
                    <TextAlignButton editor={editor} align="left" tooltip="چپ‌چین" />
                </ToolbarGroup>

                <ToolbarSeparator />

                <ToolbarGroup>
                    <FullscreenButton
                        initialFullscreen={isFullscreen}
                        onClick={() => setIsFullscreen(prev => !prev)}
                    />
                </ToolbarGroup>
                {isFullscreen?
               <div className={"hidden 2xl:block"}>
                   <ToolbarSeparator />
                   <ToolbarGroup>
                       <PageSizeDropdown
                           editor={editor!}
                           value={size}
                           onChange={setSize}
                       />
                   </ToolbarGroup>
               </div>:""}
            </Toolbar>

            <EditorContent
                editor={editor}
                className={cn(
                    "prose prose-sm rtl text-right h-full overflow-auto mx-auto",
                    isFullscreen && "prose-fullscreen",
                    isFullscreen ? size==="default"?"w-full":size==="desktop"?"w-[960px]":size==="tablet"?"w-[640px]":size==="mobile"?"w-[340px]":"w-auto":"w-auto",
                )}
            />
        </div>
    )
}
