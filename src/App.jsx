import React, { useState, useRef } from "react"
import Layout from "./Layout"
import FileExplorer from "./FileExplorer";
import Editor from "./Editor";
const App = () => {
    return (
        <div className="h-full">
            <Layout
                left={<FileExplorer></FileExplorer>}
                middle={<Editor></Editor>}
                right = {<div>right</div>}
            >
            </Layout>
        </div>
    )
};

export default App