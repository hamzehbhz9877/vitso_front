'use client'

import React from 'react';
import '@/components/tiptap-node/image-upload-node/image-upload-node.scss'
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss'
import '@/components/tiptap-node/code-block-node/code-block-node.scss'
import '@/components/tiptap-node/list-node/list-node.scss'
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss'
import '@/components/tiptap-node/code-block-node/code-block-node.scss'
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss'
import '@/components/tiptap-node/paragraph-node/paragraph-node.scss'
import parse from "html-react-parser";

const TipTapEditor = ({content}:{content:string}) => {
    return (
        <div className={"tiptap ProseMirror"}>
            {parse(content)}
        </div>
    );
};

export default TipTapEditor;