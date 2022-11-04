import React  from "react";
import Button from "./Button"
import useAppStore from "./state"

export default () => {
  let typecheck = useAppStore(state => state.typecheck)
  let igError = useAppStore(state => state.igError)
  let typeErrors = useAppStore(state => state.typeErrors)
  let selectError = useAppStore(state => state.selectError)
  let selectFix = useAppStore(state => state.selectFix)
  return (<div className="p-1">
            <Button onClick={() => {
                      selectError(null)
                      selectFix(null)
                      typecheck()
                    }} >Typecheck</Button>
            <div>Type Checker Error</div>
            <div>{igError}</div>
            <div>There are {typeErrors.length} type errors in the code</div>
            <div>
              {typeErrors.map((te, i) => <TypeError typeError={te} total={typeErrors.length} key={i} errNum={i}/>)}
            </div>
          </div>)
}

const TypeError = ({typeError, total, errNum}) => {
  let typeErrorNumber = useAppStore(state => state.typeErrorNumber)
  let selectError = useAppStore(state => state.selectError)
  let selectFix = useAppStore(state => state.selectFix)
  let typeErrorFix = useAppStore(state => state.typeErrorFix)

  return (
    <div className="bg-stone-200 my-1">
      {
        typeErrorNumber === errNum ?
          <div className="bg-stone-500 text-white pl-2">{errNum + 1}/{total} [Active]</div> :
              <div className="bg-stone-300 text-black pl-2">{errNum + 1}/{total}</div>
      }
      <div className="pl-2">{typeError.fixes.length} ways to fix the error</div>
      <div className="flex p-2">
        <div className="flex items-center bg-stone-400 cursor-pointer mr-1 p-1" onClick={()=>{
               selectError(errNum)
               selectFix(null)
             }}>All locations

    { (typeErrorFix === null && typeErrorNumber === errNum) ?
              <div className="ml-2 bg-gray-900 w-2 h-2 rounded-full"></div> : null 
            }
        </div>
        {typeError.fixes.map((fix, i) => <Fix fix={fix} key={i} fixNum={i} errNum={errNum}/>)}
      </div>
      <div className="p-2">
        {JSON.stringify(typeError.mus)}
      </div>
    </div>
  )
}


const Fix = ({fixNum, errNum}) => {
  let selectError = useAppStore(state => state.selectError)
  let selectFix = useAppStore(state => state.selectFix)
  let typeErrorNumber = useAppStore(state => state.typeErrorNumber)
  let typeErrorFix = useAppStore(state => state.typeErrorFix)
  return (<div className={`flex items-center cursor-pointer mr-1 p-1 marker${fixNum}`}
               onClick={() => {
                 selectError(errNum)
                 selectFix(fixNum)
               }}
          > Fix {fixNum + 1}
            { (typeErrorFix === fixNum && typeErrorNumber === errNum) ?
              <div className="ml-2 bg-gray-900 w-2 h-2 rounded-full"></div> : null 
            }
</div>)
}
