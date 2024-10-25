import React from 'react';
import {Weather} from './features/weather/Weather';
import './App.css';
import {LeftBar} from './features/leftBar/LeftBar';

function App() {
    return (
        <div className="App">
            <LeftBar />
            <Weather />
        </div>
    );
}

export default App;
