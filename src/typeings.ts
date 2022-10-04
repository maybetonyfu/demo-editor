import { atom } from 'jotai'
import {  getRootAtom } from './filesystem'

export const documentImportsAtom = atom<{signature: string, moduleName: string, modulePath: string}[]>([])

export const setDocumentImportsAtom = atom(null, async (get, set, modulePath: string) => {
    let isHaskell = modulePath.endsWith('.hs')
    if (!isHaskell) return;
    let rootDir = get(getRootAtom);
    let command = `cd ${rootDir} && stack ghc -- -fno-code -fforce-recomp -ddump-types -ddump-json ${modulePath}`
    // console.log(command)
    // @ts-ignore
    let output: { stdOut: string } = await Neutralino.os.execCommand(command);
    let importsData: { signature: string, moduleName: string, modulePath: string }[] = []
    output.stdOut.split('\n')
        .filter(l => l.length > 0)
        .map(l => JSON.parse(l))
        .forEach((item, i, arr) => {
            if (i % 2 === 1) return
            let currentItem = item;
            let nextItem: { doc: string, severity: string } = arr[i + 1];
            if (nextItem.severity === 'SevError') {
                // This compile target has error
                set(errorAtom, [...get(errorAtom), nextItem.doc])
            } else {
                let moduleInfo = processCompilingLoader(currentItem.doc)
                let signatures = processTypeSignatures(nextItem.doc).map(s => {
                    return {
                        signature: s,
                        moduleName: moduleInfo.moduleName,
                        modulePath: moduleInfo.modulePath
                    }
                })
                importsData = [...importsData, ...signatures]
            }

        })
    set(documentImportsAtom, importsData)
})


export const errorAtom = atom<string[]>([])


function processCompilingLoader(line: string) {
    // line is something like:
    // [1 of 3] Compiling Test3            ( Test3.hs, nothing )
    const result = line.match(/\[(\d+) of (\d+)\] Compiling (\w+)\s*\(\s*(.+), nothing \)/)
    if (result === null) return { moduleName: '', modulePath: '' }
    let numberOfModule: string = result[1]
    let totleModules: string = result[2]
    let moduleName: string = result[3]
    let modulePath: string = result[4]
    return {
        numberOfModule,
        totleModules,
        moduleName,
        modulePath
    }
}

function processTypeSignatures(doc: string) {
// line is something like:
//   TYPE SIGNATURES
//     u :: Char
//     v :: [Char]
//   Dependent modules: []
//   Dependent packages: [base-4.14.1.0, ghc-prim-0.6.1,
                    //    integer-gmp-1.0.3.0]    
    let signatures : string[] = []
    for (let line of doc.split('\n')) {
        if (line === 'TYPE SIGNATURES') continue;
        if (line.startsWith('Dependent ')) break;
        signatures = [...signatures, line.trimStart()]
    }
    return signatures
}