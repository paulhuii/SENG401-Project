import React, {useCallback} from 'react';
import Quill from "quill"

// Quill style sheet
import "quill/dist/quill.snow.css"
import "./RichTextEditor.css"

// Quill documentation: https://quilljs.com/

const toolbarOptions = [
    // false is normal font
    [{ 'header': [1, 2, 3, false] }],
    // use default font choices
    [{font: []}],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    // allow sub and superscript
    [{ 'script': 'sub'}, { 'script': 'super' }],
    // indents
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'align': [] }],
    ['clean']
]

const RichTextEditor = () => {

    // Callback hook to prevent re-rendering of the text editor toolbar
    // once the div is rendered then callback function is called. This way the div is always defined.
    const wrapperRef = useCallback((wrapper) => {

        // Check in case the div was not rendered return null instead of error
        if (wrapper == null) return

        // everytime we render this clear what was there before
        wrapper.innerHTML = ""

        // Create a div element to put the editor in
        const richTextEditor = document.createElement("div")
        wrapper.append(richTextEditor)
        new Quill(richTextEditor, {theme:"snow", modules: {toolbar: toolbarOptions}})
    }, [])

    return <div className="rich-text-editor" id="container" ref={wrapperRef}></div>
}

export default RichTextEditor