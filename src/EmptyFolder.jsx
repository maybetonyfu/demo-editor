import React from "react"
import Button from "./Button"
import useAppStore from "./state"

const EmptyFolder = () => {
  const setRootDir = useAppStore(state => state.setRootDir)
  const expandTree = useAppStore(state => state.expandTree)
  return (<div className="flex flex-col p-2">
    <div className="text-base mb-6"> You don't have a project open. </div>
    <Button onClick={async () => {
      let entry = await Neutralino.os.showFolderDialog("Open your project directory")
      setRootDir(entry)
      //let entries = await Neutralino.filesystem.readDirectory(entry);
              //appendTree(".", entries)
      expandTree(".")
    }}>Open project</Button>
  </div>)
}

export default EmptyFolder
