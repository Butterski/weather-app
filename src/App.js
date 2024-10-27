import React from 'react';
import {Weather} from './features/weather/Weather';
import './App.css';
import {LeftBar} from './features/leftBar/LeftBar';
import {Routes, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectWeather} from './redux/weatherSlices';
import {Home} from './features/home/Home';

function App() {
    const weather = useSelector(selectWeather);
    return (
        <div className="App">
            <LeftBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path={`/${weather.actual_city}`} element={<Weather />} />
            </Routes>
        </div>
    );
}

export default App;
