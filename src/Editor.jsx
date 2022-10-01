import React, { useEffect, useRef, useState } from "react"
import { basicSetup, EditorView } from "codemirror";
import { EditorState, StateEffect, StateField } from "@codemirror/state";
import { Decoration } from "@codemirror/view";
import { currentDocument } from "./filesystem";
import { useAtom } from "jotai";

export default () => {
    let dom = useRef(null)
    let [view, setView] = useState(null);
    let [document] = useAtom(currentDocument)
    useEffect(() => {
        let state = EditorState.create({
            doc: document,
            extensions: [basicSetup]
        });

        let v = new EditorView({
            state,
            parent: dom.current
        });
        setView(v)
    }, [])

    useEffect(() => {
        if (view) {
            // console.log("Doc change:", document)
            // console.log(view.state)
            view.dispatch({
                changes:  {from:0, to: view.state.doc.length}
            })
            view.dispatch({
                changes: {from:0, insert: document}})
        }
    }, [document])

    return (
        <div ref={dom} id="editor">
        </div>
    )
}