import React from 'react';
import { useSelector } from 'react-redux';
import { selectWeather } from '../../redux/weatherSlices';
import styles from './weather.module.css';

export const Weather = () => {
    const weather = useSelector(selectWeather);

    const getBackgroundStyle = (temperature) => {
        if (temperature <= 0) {
            return 'radial-gradient(circle, rgba(0, 198, 255, 0.3), rgba(0, 114, 255, 0.3))';
        } else if (temperature > 0 && temperature <= 15) {
            return 'radial-gradient(circle, rgba(251, 194, 235, 0.3), rgba(166, 193, 238, 0.3))';
        } else if (temperature > 15 && temperature <= 30) {
            return 'radial-gradient(circle, rgba(253, 219, 146, 0.3), rgba(209, 253, 255, 0.3))';
        } else {
            return 'radial-gradient(circle, rgba(255, 81, 47, 0.3), rgba(221, 36, 118, 0.3))';
        }
    };

    return (
        <div
            className={styles.container}
            style={{ background: getBackgroundStyle(weather.currentTemperature) }}
        >
            <div>
                <div className={styles.city}>{weather.actual_city}</div>
                <div className={styles.temperature}>{weather.currentTemperature}°{weather.temperature_unit}</div>
            </div>
        </div>
    );
};