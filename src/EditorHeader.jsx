import React from "react"
import useAppStore from "./state"

export default () => {
  let docPath = useAppStore(state => state.docPath);
  return (<div className="bg-stone-300 h-6 px-4">{docPath}</div>)
}
