'use client'

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
import ListItem from '@tiptap/extension-list-item'

import HeadingDropdownMenu from "@/components/tiptap-ui/heading-dropdown-menu/heading-dropdown-menu"
import {ImageUploadButton} from '@/components/tiptap-ui/image-upload-button'
import {ImageUploadNode} from '@/components/tiptap-node/image-upload-node'
import {handleImageUpload, MAX_FILE_SIZE} from '@/lib/tiptap-utils'
import {LinkPopover} from '@/components/tiptap-ui/link-popover'
import {ListDropdownMenu} from '@/components/tiptap-ui/list-dropdown-menu'
import {Toolbar, ToolbarGroup, ToolbarSeparator} from "@/components/tiptap-ui-primitive/toolbar"
import {MarkButton} from '@/components/tiptap-ui/mark-button'
import {TextAlignButton} from '@/components/tiptap-ui/text-align-button'

import '@/components/tiptap-node/image-upload-node/image-upload-node.scss'
import '@/components/tiptap-node/code-block-node/code-block-node.scss'
import '@/components/tiptap-node/list-node/list-node.scss'
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss'

import {useField} from "formik"
import {useEffect} from "react"
import {cn} from "@/lib/utils"

export default function TiptapEditor({
                                         uploadUrl,
                                         defaultData,
                                         getEditorData,
                                         name
                                     }: {
    defaultData?: string,
    name: string,
    uploadUrl: string,
    getEditorData: (data: string, text: string) => void
}) {
    const [field, meta] = useField(name)

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: false,
                listItem: false,
            }),
            BulletList,
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
            TextAlign.configure({types: ['heading', 'paragraph']})
        ],
        content: defaultData ?? '',
        onUpdate({editor}) {
            const html = editor.getHTML()
            const text = editor.getText()
            getEditorData(html, text)
        },
        immediatelyRender: false,
    })

    useEffect(() => {
        if (editor && defaultData) {
            editor.commands.setContent(defaultData)
        }
    }, [editor, defaultData])

    if (!editor) return null

    return (
        <div className={cn("space-y-4 border p-3", meta.touched && meta.error && 'input-field--error')}>
            <Toolbar variant="floating"  className="bg-white overflow-y-auto">
                <ToolbarGroup>
                    <ImageUploadButton editor={editor} />
                </ToolbarGroup>

                <ToolbarSeparator/>

                <ToolbarGroup>
                    <HeadingDropdownMenu tooltip="عناوین" levels={[1, 2, 3, 4, 5, 6]} editor={editor}/>
                </ToolbarGroup>

                <ToolbarSeparator/>

                <ToolbarGroup>
                    <LinkPopover tooltip="لینک" editor={editor}/>
                    <ListDropdownMenu tooltip="لیست" editor={editor} types={['bulletList', 'orderedList', 'taskList']}/>
                </ToolbarGroup>

                <ToolbarSeparator/>

                <ToolbarGroup>
                    <MarkButton tooltip="بولد" editor={editor} type="bold"/>
                    <MarkButton tooltip="مورب" editor={editor} type="italic"/>
                    <MarkButton tooltip="خط خورده" editor={editor} type="strike"/>
                    <MarkButton tooltip="کد" editor={editor} type="code"/>
                    <MarkButton tooltip="زیرخط‌دار" editor={editor} type="underline"/>
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
            </Toolbar>

            <EditorContent className="prose prose-sm rtl text-right" editor={editor} role="presentation"/>
        </div>
    )
}
