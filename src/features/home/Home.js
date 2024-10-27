import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {add_city, set_city} from '../../redux/weatherSlices';
import styles from './home.module.css';
import {useNavigate} from 'react-router-dom';

export const Home = () => {
    const [city, setCity] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
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
        </div>
    );
};
