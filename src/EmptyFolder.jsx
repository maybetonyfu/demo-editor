import React from "react"
import Button from "./Button"
import { setRoot } from "./filesystem"
import { useAtom } from "jotai"

const EmptyFolder = ({setFiles}) => {
    let [, setRootAs] = useAtom(setRoot)
    return(<div className="flex flex-col p-2">
        <div className="text-base mb-6"> You don't have a project open. </div>
        <Button onClick={async () => {
            let entry = await Neutralino.os.showFolderDialog("Open your project directory")
            let entries = await Neutralino.filesystem.readDirectory(entry);
            setRootAs(entry)
            setFiles(entries)
        }}>Open project</Button>
    </div>) 
}

export default EmptyFolder