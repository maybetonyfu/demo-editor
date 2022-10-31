import React from "react";

function CaretRightIcon(props) {
    return (
        <svg viewBox="0 0 256 256" {...props}><path fill="currentColor" d="M96 216a8.5 8.5 0 0 1-5.7-2.3a8.1 8.1 0 0 1 0-11.4l74.4-74.3l-74.4-74.3a8.1 8.1 0 0 1 11.4-11.4l80 80a8.1 8.1 0 0 1 0 11.4l-80 80A8.5 8.5 0 0 1 96 216Z"></path></svg>
    )
}

function FileIcon(props) {
    return (
        <svg viewBox="0 0 256 256" {...props}><path fill="currentColor" d="m213.7 82.3l-56-56A8.1 8.1 0 0 0 152 24H56a16 16 0 0 0-16 16v176a16 16 0 0 0 16 16h144a16 16 0 0 0 16-16V88a8.1 8.1 0 0 0-2.3-5.7Zm-53.7-31L188.7 80H160ZM200 216H56V40h88v48a8 8 0 0 0 8 8h48v120Z"></path></svg>
    )
}

function FolderIcon(props) {
    return (
        <svg viewBox="0 0 256 256" {...props}><path fill="currentColor" d="M216 72h-84.7L104 44.7A15.9 15.9 0 0 0 92.7 40H40a16 16 0 0 0-16 16v144.6A15.4 15.4 0 0 0 39.4 216h177.5a15.2 15.2 0 0 0 15.1-15.1V88a16 16 0 0 0-16-16ZM92.7 56l16 16H40V56ZM216 200H40V88h176Z"></path></svg>
    )
}
const CaretDownIcon = () => (
<svg width="1em" height="1em" viewBox="0 0 256 256"><path fill="currentColor" d="M128 184a8.5 8.5 0 0 1-5.7-2.3l-80-80a8.1 8.1 0 0 1 11.4-11.4l74.3 74.4l74.3-74.4a8.1 8.1 0 0 1 11.4 11.4l-80 80a8.5 8.5 0 0 1-5.7 2.3Z"></path></svg>
)


export { CaretRightIcon, CaretDownIcon, FileIcon, FolderIcon }
