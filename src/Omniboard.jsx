import React, {useState} from "react";
import Button from "./Button"
import { documentImportsAtom, setDocumentImportsAtom } from "./typeings"
import { currentDocPathAtom } from "./filesystem";
import { useAtom } from "jotai";

export default () => {
    let [docPath] = useAtom(currentDocPathAtom);
    let [, setImport] = useAtom(setDocumentImportsAtom)
    let [documentImports,] = useAtom(documentImportsAtom);
    let [showFullName, toggleShowFullName] = useState(false)
    return (<div className="px-2 py-4">
            <div className="flex items-center">
            <input type={"checkbox"} checked={showFullName} id="fullname" onChange={(e) => {toggleShowFullName(!showFullName)}}></input>
            <label className="mx-2 " htmlFor="fullname">Qualify name</label>
            <Button onClick={() => {
                setImport(docPath)
            }}> Recaclculate-import</Button>
            </div>

            <div>Improted Functions</div>
            <div className="bg-green-100 py-1 px-1 mb-2">
                {documentImports
                    .filter((im) => im.modulePath !== docPath)
                    .map((im, i) => {
                        return (<div className="py-1" key={i}>
                            <div className="font-mono">
                                {showFullName?im.moduleName + "." : ""}{im.signature}
                            </div>
                            <div className="text-xs italic">
                                from {im.modulePath}
                            </div>
                        </div>)
                    })}
            </div>


            <div>Exported Functions</div>
            <div className="bg-blue-100 py-1 px-1">
                {documentImports
                    .filter((im) => im.modulePath === docPath)
                    .map((im, i) => {
                        return (<div className="py-1" key={i}>
                            <div className="font-mono">
                                {showFullName?im.moduleName + "." : ""}{im.signature}
                            </div>
                            <div className="text-xs italic">
                                from {im.modulePath}
                            </div>
                        </div>)
                    })}
            </div>
    </div>)
}
