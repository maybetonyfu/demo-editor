import React, { useState, useRef } from "react"
import Layout from "./Layout"
import FileExplorer from "./FileExplorer";
import EditorHeader from "./EditorHeader"
import Editor from "./Editor";
import Omniboard from "./Omniboard";
import useAppStore from "./state"
const App = () => {
  const tree = useAppStore(state => state.tree)
  return (
    <div className="h-full">
      <Layout
        left={<FileExplorer node={tree}></FileExplorer>}
        middle={(<div className="h-full flex flex-col">
          <EditorHeader />
          <Editor></Editor>
        </div>)}
        right={<Omniboard />}
      >
      </Layout>
    </div>
  )
};

export default App
