import React, {useState} from "react"
import EmptyFolder from "./EmptyFolder"
import FileEntry from "./FileEntry"
export default () => {
    const [files, setFiles] = useState([])
    return (
    files.length === 0 ?
    <EmptyFolder setFiles={setFiles}></EmptyFolder>
    : <div className="flex flex-col">
        {
            files.map((f, i) => <FileEntry entry={f.entry} type={f.type} key={i}/>)
        }
    </div>
    )
}