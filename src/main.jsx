import { createRoot } from 'react-dom/client';
import React from 'react';
import App from "./App"


const container = document.getElementById('react-root');
const root = createRoot(container);
root.render(<App />);

window.Neutralino.init(); 
