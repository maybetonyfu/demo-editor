import React, { useEffect, useRef, useState } from "react"
import { basicSetup, EditorView } from "codemirror";
import { EditorState, StateEffect, StateField } from "@codemirror/state";
import { Decoration, keymap } from "@codemirror/view";
import { currentDocumentAtom, saveDocAtom } from "./filesystem";
import { useAtom } from "jotai";


export default () => {
    let dom = useRef(null)
    let [, saveDoc] = useAtom(saveDocAtom)
    let [document] = useAtom(currentDocumentAtom)

    let defaultTheme = EditorView.theme({
        "&": {
            height: "100%"
        }
    })

    const saveDocument = (view) => {
        console.log("Save document")
        saveDoc(view.state.doc.sliceString(0, view.state.doc.length))
    }
    const defaultKeymap = keymap.of([{
        key: "Mod-s",
        preventDefault: true,
        run: saveDocument
    }])

    let [view, setView] = useState(null);

    useEffect(() => {
        let state = EditorState.create({
            doc: document,
            extensions: [basicSetup, defaultTheme, defaultKeymap]
        });

        let v = new EditorView({
            state,
            parent: dom.current
        });
        setView(v)
    }, [])

    useEffect(() => {
        if (view) {
            view.dispatch({
                changes: { from: 0, to: view.state.doc.length }
            })
            view.dispatch({
                changes: { from: 0, insert: document }
            })
        }
    }, [document])

    return (
        <div ref={dom} id="editor" className="h-full ">
        </div>
    )
}