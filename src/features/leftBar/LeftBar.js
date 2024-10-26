import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectWeather, set_temperature_unit} from '../../redux/weatherSlices';
import {CityBar} from '../cityBar/CityBar';
import styles from './leftBar.module.css';

export const LeftBar = () => {
    const weather = useSelector(selectWeather);
    const dispatch = useDispatch();

    return (
        <div className={styles.container}>
            <div className={styles.recent_cities_container}>
                <h1>Recent Cities</h1>
                {weather.city_history.map((city, index) => (
                    <CityBar key={index} city_name={city} />
                ))}
            </div>
            <div className={styles.divider} />
            <div className={styles.favourite_cities_container}>
                <h1>Favourite Cities</h1>
                <div className={styles.favourite_cities}>
                    {weather.favourite_cities.map((city, index) => (
                        <CityBar key={index} city_name={city} />
                    ))}
                </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.change_unit_container}>
                <h1>Change Unit</h1>
                <h2>Temperature Unit: {weather.temperature_unit}</h2>
                <button
                    onClick={() => {
                        dispatch(set_temperature_unit('C'));
                    }}
                >
                    Celsius
                </button>
                <button
                    onClick={() => {
                        dispatch(set_temperature_unit('F'));
                    }}
                >
                    Fahrenheit
                </button>
            </div>
        </div>
    );
};
