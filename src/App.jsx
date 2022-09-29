import React from "react"
import { Mosaic, MosaicWindow } from 'react-mosaic-component';

const ELEMENT_MAP = {
    a: <div>Left Window</div>,
    b: <div>Top Right Window</div>,
    c: <div>Bottom Right Window</div>,
};
const TITLE_MAP = {
    a: 'Left Window',
    b: 'Top Right Window',
    c: 'Bottom Right Window',
    new: 'New Window',
};
const Layout = () => {
    return <Mosaic
        blueprintNamespace="bp4"
        renderTile={(id, path) => (
            <MosaicWindow path={path} createNode={() => 'new'} title={TITLE_MAP[id]}>
                <h1>{TITLE_MAP[id]}</h1>
            </MosaicWindow>
        )}
        initialValue={{
            direction: 'row',
            first: 'a',
            second: {
                direction: 'column',
                first: 'b',
                second: 'c',
            },
        }}
    />
}
const App = () => {
    return (
        <div className="h-full">
            <Layout></Layout>
        </div>
    )
};

export default App