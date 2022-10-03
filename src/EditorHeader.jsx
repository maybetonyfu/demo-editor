import React from "react"
import { useAtom } from "jotai"
import { currentDocNameAtom } from "./filesystem"
export default () => {
    let [docName] = useAtom(currentDocNameAtom);

    return (<div className="bg-stone-300 h-6 px-4">{docName}</div>)
}