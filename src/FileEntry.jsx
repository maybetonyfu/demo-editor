import React from "react";
import { useAtom } from "jotai";
import { openDoc } from "./filesystem";
import { CaretRightIcon, FileIcon, FolderIcon } from "./Icons"

const File = ({path}) => {
    let [, open] = useAtom(openDoc);
    return (<div
        onClick={async () => {
            open(path)
        }} 
        className="flex px-2 py-0.5 items-center cursor-pointer">
        <FileIcon className="w-4 ml-4" />
        <span className="ml-1">{path}</span>
    </div>)
}

const Folder = ({path}) => (
    <div className="flex px-2 py-0.5 items-center cursor-pointer">
        <CaretRightIcon  className="w-4" />
        <FolderIcon className="w-4" />
        <span className="ml-1">{path}</span>
    </div>
)


export default ({entry, type}) => type === "FILE" ? <File path={entry}/> : <Folder path={entry}/>
