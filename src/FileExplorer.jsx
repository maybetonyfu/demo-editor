import React from "react"
import EmptyFolder from "./EmptyFolder"
import useAppStore from "./state"
import { CaretRightIcon, CaretDownIcon, FileIcon, FolderIcon } from "./Icons"

const FileExplorer = ({ node }) => {
  return (
    node.children && node.children.length === 0 && node.path === "." ?
      <EmptyFolder></EmptyFolder>
      : <div className="flex flex-col">
        {
          node.children.map((subnode, i) => <Entry node={subnode} key={i} />)
        }
      </div>
  )
}

const Entry = ({ node }) => {
  return node.type === "FILE" ? <File node={node} /> : <Folder node={node} />
}

const File = ({ node }) => {
  const openDoc = useAppStore(state => state.openDoc)
  return (<div
    onClick={() => {
      openDoc(node.path)
    }}
    className="flex px-2 py-0.5 items-center cursor-pointer">
    <FileIcon className="w-4 ml-4" />
    <span className="ml-1 select-none">{node.path.split("/").reverse()[0]}</span>
  </div>)
}

const Folder = ({ node }) => {
  const expandTree = useAppStore(state => state.expandTree)
  const collapseTree = useAppStore(state => state.collapseTree)

  return (
    <div className="flex flex-col px-2 py-0.5  cursor-pointer"
    >
      <div className="flex items-center"
        onClick={() => {
          if (node.expand) {
            collapseTree(node.path)
          } else {
            expandTree(node.path)
          }
        }}
      >
        {node.expand ? <CaretDownIcon className="w-4" /> : <CaretRightIcon className="w-4" />}
        <FolderIcon className="w-4" />
        <span className="ml-1 select-none">{node.path.split("/").reverse()[0]}</span>
      </div>
      <div>
        <FileExplorer node={node} />
      </div>
    </div>
  )
}

export default FileExplorer
