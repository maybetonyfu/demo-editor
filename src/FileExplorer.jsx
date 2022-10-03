import React, { useState } from "react"
import EmptyFolder from "./EmptyFolder"
import FileEntry from "./FileEntry"
import { fileListAtom } from "./filesystem"
import { useAtom } from "jotai"

export default () => {
    const [fileList] = useAtom(fileListAtom)
    return (
        fileList.length === 0 ?
            <EmptyFolder></EmptyFolder>
            : <div className="flex flex-col">
                {
                    fileList.map((f, i) => <FileEntry entry={f.entry} type={f.type} key={i} />)
                }
            </div>
    )
}