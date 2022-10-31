import React from "react";
import { CaretRightIcon, CaretDownIcon, FileIcon, FolderIcon } from "./Icons"
import useAppStore from "./state"


const File = ({ entry }) => {
  const openDoc = useAppStore(state => state.openDoc)
  return (<div
    onClick={() => {
      openDoc(entry.path)
    }}
    className="flex px-2 py-0.5 items-center cursor-pointer">
    <FileIcon className="w-4 ml-4" />
    <span className="ml-1">{entry.path}</span>
  </div>)
}

const Folder = ({ entry }) => {
  const appendTree = useAppStore(state => state.appendTree)
  const collapseTree = useAppStore(state => state.collapseTree)
  const rootDir = useAppStore(state => state.rootDir)
  return (
  <div className="flex px-2 py-0.5 items-center cursor-pointer"
       onClick={async () => {
         if (entry.expand) {
           collapseTree(entry.path)
         } else {
           let entries = await Neutralino.filesystem.readDirectory(rootDir + "/" + entry.path);
           appendTree(entry.path, entries)
         }
       }}
  >
    {entry.expand ? <CaretDownIcon className="w-4" /> : <CaretRightIcon className="w-4" /> }
    <FolderIcon className="w-4" />
    <span className="ml-1">{entry.path}</span>
  </div>
)}



export default ({ entry }) => {
  return entry.type === "FILE" ? <File entry={entry} /> : <Folder entry={entry} />
}
