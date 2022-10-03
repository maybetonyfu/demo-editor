import React from "react";
import Button from "./Button";
import {setDocumentImportsAtom, documentImportsAtom} from "./typeings"
import { useAtom } from "jotai";

export default () => {
    let [, setImports] = useAtom(setDocumentImportsAtom);
    let [documentImports,] = useAtom(documentImportsAtom)
    return (<div>
        <Button onClick={()=> {
            setImports()

        }}>Get imports</Button>
        <div>
        {documentImports.map((im, i) => {
            return (<div key={i}>{im.signature} </div>)
        })}

        </div>

    </div>)
}