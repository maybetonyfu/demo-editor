import { atom } from 'jotai'

export const project = atom({rootDir: "", filePath: "", fileContent:""})

export const currentDocument = atom((get) => {
    console.log(get(project).fileContent)
    return get(project).fileContent
})

export const setRoot = atom(null, (get, set, rootDir) => {
    set(project,  {rootDir, filePath: "", fileContent: 'hello world'})
})

export const openFile = atom(null, async (get, set, path) => {
    console.log(get(project).rootDir)
    console.log(path)
    let content = await Neutralino.filesystem.readFile(get(project).rootDir + "/" + path)
    set(project, {
        rootDir: get(project).rootDir,
        filePath: path,
        fileContent: content
    })
})
export const fileList = atom([])