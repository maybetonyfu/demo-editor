import React from "react"

export default (props) => {
    return (
    <button
    onClick={props.onClick}
    className="text-base bg-emerald-400 py-1 px-2 rounded-md">
        {props.children}
    </button>)
}