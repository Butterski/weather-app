import React from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import styles from './home.module.css';
import {add_city, set_city} from '../../redux/weatherSlices';

export const Home = () => {
    const [city, setCity] = React.useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(set_city(city));
        dispatch(add_city(city));
        navigate(`/${city}`);
    };

    const polishCities = [
        'Warszawa',
        'Kraków',
        'Gdańsk',
        'Wrocław',
        'Katowice',
    ];

    const handleCityClick = city => {
        setCity(city);
        dispatch(set_city(city));
        dispatch(add_city(city));
        navigate(`/${city}`);
    };

    return (
        <div className={styles.container}>
            <h1>Weather App</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="Enter city name"
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>
                    Set City
                </button>
            </form>
            <div className={styles.cityList}>
                {polishCities.map(city => (
                    <button
                        key={city}
                        onClick={() => handleCityClick(city)}
                        className={styles.cityButton}
                    >
                        {city}
                    </button>
                ))}
            </div>
        </div>
    );
};
