import create from 'zustand'

function replacePartOfTree(tree, parent, newNode) {
  if (tree.type === "FILE") return tree
  if (tree.path === parent) return newNode
  if (tree.path !== parent) {
    return { ...tree, children: tree.children.map(t => replacePartOfTree(t, parent, newNode)) }
  }
}

const useAppStore = create((set, get) => ({
  rootDir: "",
  docPath: "",
  docContent: "",
  igOut: {},
  typeErrors: [],
  typeErrorNumber: null,
  typeErrorFix: null,
  igError: "",
  tree: { path: ".", type: "DIRECTORY", children: [] },
  setRootDir: (rootDir) => set({ rootDir }),
  setDocPath: (docPath) => set({ docPath }),
  setDocContent: (docContent) => set({ docContent }),
  openDoc: async (docPath) => {
    let fullPath = get().rootDir + "/" + docPath
    let docContent = await Neutralino.filesystem.readFile(fullPath)
    set({ docPath, docContent })
  },
  saveDoc: async (docContent) => {
    let fullPath = get().rootDir + "/" + get().docPath
    await Neutralino.filesystem.writeFile(fullPath, docContent)
    set({ docContent })
  },
  collapseTree: (parent) => {
    const tree = replacePartOfTree(get().tree, parent, { path: parent, expand: false, children: [] })
    set({ tree })
  },
  expandTree: async (node_path) => {
    let p = get().rootDir + "/" + node_path
    let entries = await Neutralino.filesystem.readDirectory(p);
    const newDirList = entries
      .filter(item => item.type === "DIRECTORY")
      .filter(item => !['.', '..'].includes(item.entry))
      .map(item => ({ path: node_path + "/" + item.entry, type: item.type, expand: false, children: [] }))

    const newFileList = entries
      .filter(item => item.type === "FILE")
      .map(item => ({ path: node_path + "/" + item.entry, type: item.type }))

    const tree = replacePartOfTree(
      get().tree,
      node_path,
      { path: node_path, expand: true, children: [...newDirList, ...newFileList] }
    )
    set({ tree })
  },
  selectError: n => set({typeErrorNumber: n}),
  selectFix: n => set({typeErrorFix: n}),
  typecheck: async () => {
    let rootDir = get().rootDir
    let docPath = get().docPath
    let command = `c:/Users/sfuu0016/Projects/demo-editor/lib/ig.exe ${rootDir} ${docPath}`
    let result = await Neutralino.os.execCommand(command);
    if (result.stdOut.length) {
      let diagnosis = JSON.parse(result.stdOut)

      let { constraints, islands, mus, mcs, mss } = diagnosis
      //let highlights = [...new Set(islands[0].flatMap(n => mus[n]))].map(n => constraints.find(c => c.id === n).loc)
      const typeErrors = islands.map(island => {
        let allConstraintsNumbers = nub(island.flatMap(n => mus[n]))
        let partialMcsNumbers = mcs.map(m => m.filter(n => allConstraintsNumbers.includes(n)))
        let uniqMcsNumbers = nubArray(partialMcsNumbers)
        return {
          allLocs: allConstraintsNumbers.map(findLoc(constraints)),
          fixes: uniqMcsNumbers.map(fix => fix.map(findLoc(constraints))),
          mus: island.map(n => mus[n])
        }
      })
      set({ typeErrors, igError: "" })

    } else {
      set({ typeErrors: [], igError: result.stdErr })
    }

  }
}))

const nub = a => [...new Set(a)]
const nubArray = a => {
  const sorted = a.map(x => [...x].sort())
  const encodeArray = sorted.map(x => x.join(","))
  const nubbed = nub(encodeArray)
  return nubbed.map(x => x.split(",").map(n => parseInt(n, 10)))
}

const findLoc = (constraints, n) => {
  if (n) return constraints.find(c => c.id == n).loc
  return x => constraints.find(c => c.id == x).loc
}
export default useAppStore
