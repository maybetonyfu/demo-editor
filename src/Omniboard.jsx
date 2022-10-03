import React from "react";
import Button from "./Button";
import { setDocumentImportsAtom, documentImportsAtom } from "./typeings"
import { currentDocPathAtom } from "./filesystem";
import { useAtom } from "jotai";

export default () => {
    let [, setImports] = useAtom(setDocumentImportsAtom);
    let [docPath] = useAtom(currentDocPathAtom);
    let [documentImports,] = useAtom(documentImportsAtom);
    return (<div className="px-2 py-4">
        <Button onClick={() => {
            setImports()

        }}>Get imports</Button>
        <div>
            <div>Improted Functions</div>
            <div className="bg-green-100 py-1 px-1">
                {documentImports
                    .filter((im) => im.modulePath !== docPath)
                    .map((im, i) => {
                        return (<div className="py-1" key={i}>
                            <div className="font-mono">
                                {im.signature}
                            </div>
                            <div className="text-sm">
                                from {im.modulePath}
                            </div>
                        </div>)
                    })}
            </div>

        </div>

    </div>)
}
