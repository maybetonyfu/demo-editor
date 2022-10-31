import React, {useState} from "react";
import Button from "./Button"
import useAppStore from "./state"

export default () => {
  let typecheck = useAppStore(state => state.typecheck)
  let igError = useAppStore(state => state.igError)
  return (<div className="p-1">
            <Button onClick={typecheck} >Typecheck</Button>
            <div>Type Checker Error</div>
            <div>{igError}</div>
          </div>)
}
