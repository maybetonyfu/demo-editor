import React, { useState, useRef } from "react"

const Layout = () => {
    const [leftWindowSize, setLeftWidth] = useState(100);
    const [rightWindowSize, setRightWidth] = useState(300);
    const [resizer, setResizer] = useState(null);
    const myref = useRef(null);
    return (
        <div className="h-full flex"
            ref={myref}
            onMouseUp={(e) => {
                setResizer(null);
                myref.current.style.cursor = 'auto'
            }}
            onMouseMove={(e) => {
                if (resizer === 'left') {
                    if (e.clientX !== 0) setLeftWidth(e.clientX)
                    myref.current.style.cursor = 'ew-resize';
                } else if (resizer === 'right') {
                    if (e.clientX !== 0) setRightWidth(document.body.clientWidth
                        - e.pageX - 10)
                    myref.current.style.cursor = 'ew-resize';
                }
            }}>
            <div style={{ width: leftWindowSize }} className="bg-gray-200"></div>
            <div
                style={{ cursor: 'ew-resize' }}
                onMouseDown={(e) => setResizer('left')}
                className="h-full bg-black w-2"></div>
            <div className="flex-grow"></div>
            <div
                style={{ cursor: 'ew-resize' }}
                onMouseDown={(e) => setResizer('right')}
                className="h-full bg-black w-2"></div>
            <div style={{ width: rightWindowSize }} className="bg-gray-200"></div>
        </div>)
}

export default Layout