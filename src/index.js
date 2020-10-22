import React from 'react';
import ReactDOM from 'react-dom';
import Main from './core/core';
import { gridSize, pace } from './config.js';


ReactDOM.render(
    <React.StrictMode>
        <Main
            gridSize={gridSize}
            pace={pace}
        />
    </React.StrictMode>,
    document.getElementById('root')
);
