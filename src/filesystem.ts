import { atom } from 'jotai'

export const projectAtom = atom({rootDir: "", filePath: "", fileContent:""})

export const currentDocumentAtom = atom((get) => {
    return get(projectAtom).fileContent
})

export const currentDocPathAtom = atom((get) => {
    return get(projectAtom).filePath
})

export const currentDocNameAtom = atom((get) => {
    let path =  get(projectAtom).filePath
    let parts = path.split("/")
    return parts[parts.length - 1]
})

export const setRootAtom = atom(null, (get, set, rootDir: string) => {
    set(projectAtom,  {rootDir, filePath: "", fileContent: ''})
})

export const getRootAtom = atom((get) => {
    return get(projectAtom).rootDir
})

export const openDoc = atom(null, async (get, set, path: string) => {
    // @ts-ignore
    let content = await Neutralino.filesystem.readFile(get(projectAtom).rootDir + "/" + path)
    set(projectAtom, {
        rootDir: get(projectAtom).rootDir,
        filePath: path,
        fileContent: content
    })
})

export const saveDocAtom = atom(null, async (get, set, doc: string) => {
    let docPath = get(projectAtom).rootDir + "/" + get(projectAtom).filePath;
    // @ts-ignore
    await Neutralino.filesystem.writeFile(docPath, doc)
    set(projectAtom, {
        ...get(projectAtom),
        fileContent: doc
    })
})

export const fileListAtom = atom<{entry: string, type: string}[]>([])
export const setFileListAtom = atom(null, (get, set, newlist: {entry: string, type: string}[]) => {
    let newDirList = newlist.filter(item => item.type === "DIRECTORY").filter(item=> !['.', '..'].includes(item.entry))
    let newFileList = newlist.filter(item => item.type === "FILE")
    set(fileListAtom, [...newDirList, ...newFileList])
})
