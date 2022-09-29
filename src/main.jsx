import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App"

const container = document.getElementById('react-root');
const root = ReactDOM.createRoot(container);
root.render(<App></App>)


window.Neutralino.init(); 