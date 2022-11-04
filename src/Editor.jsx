import React, { useEffect, useRef, useState } from "react"
import { basicSetup, EditorView } from "codemirror";
import { EditorState, StateEffect, StateField, RangeSet } from "@codemirror/state";
import { Decoration, keymap } from "@codemirror/view";
import useAppStore from "./state"


export default () => {
  let dom = useRef(null)
  let saveDoc = useAppStore(state => state.saveDoc)
  let document = useAppStore(state => state.docContent)
  let typeErrors = useAppStore(state => state.typeErrors)
  let typeErrorNumber = useAppStore(state => state.typeErrorNumber)
  let typeErrorFix = useAppStore(state => state.typeErrorFix)
  let defaultTheme = EditorView.theme({
    "&": {
      height: "100%"
    }
  })

  const saveDocument = (view) => {
    console.log("Save document")
    saveDoc(view.state.doc.sliceString(0, view.state.doc.length))
  }

  const hlEffect = StateEffect.define({
    map: ({ from, to, marker }, change) => ({
      from: change.mapPos(from),
      to: change.mapPos(to),
      marker
    })
  });

  const hlEffectRef = useRef(hlEffect)

  let [view, setView] = useState(null);

  useEffect(() => {
    const editorTheme = EditorView.baseTheme({
      ".marker0": { background: "#d5f200" },
      ".marker1": { background: "#ffdddf" },
      ".marker2": { background: "#ffe0b2" },
      ".marker3": { background: "#5dffa2" },
      ".marker4": { background: "#c6e0ff" },
      ".marker5": { background: "#00ffe4" },
    });

    const defaultKeymap = keymap.of([{
      key: "Mod-s",
      preventDefault: true,
      run: saveDocument
    }])

    const higlihtField = StateField.define({
      create: () => Decoration.none,
      update: (field, transaction) => {
        let newfield = RangeSet.empty
        for (let e of transaction.effects) {
          if (e.is(hlEffectRef.current)) {
            newfield = newfield.update({
              add: [
                Decoration.mark({ class: e.value.marker }).range(e.value.from, e.value.to)
              ]
            });
          }
        }
        return newfield;
      },
      provide: (field) => EditorView.decorations.from(field)
    });

    let state = EditorState.create({
      doc: document,
      extensions: [basicSetup, defaultTheme, defaultKeymap, editorTheme, higlihtField]
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

  useEffect(() => {
    if (view) {
      let doc = view.state.doc;
      let highlights = []
      if (typeErrorNumber !== null && typeErrorFix === null) {
        highlights = typeErrors[typeErrorNumber].fixes.flatMap((fix, i) => fix.map(loc => ({...loc, fix: i})));
      } else if (typeErrorNumber !== null && typeErrorFix !== null) {
        highlights = typeErrors[typeErrorNumber].fixes[typeErrorFix].map(loc => ({...loc, fix: typeErrorFix}))
      }
      let hlEffects = highlights.map(({ from, to, fix }) => {
        let [fromL, fromC] = from
        let [toL, toC] = to
        const startPos = doc.line(fromL).from + fromC - 1
        const endPos = doc.line(toL).from + toC - 1
        return hlEffectRef.current.of({ from: startPos, to: endPos, marker: `marker${fix}` })
      })
      view.dispatch({ effects: hlEffects })
    }
  }, [typeErrors, typeErrorNumber, typeErrorFix ])
  return (
    <div ref={dom} id="editor" className="h-full ">
    </div>
  )
}
