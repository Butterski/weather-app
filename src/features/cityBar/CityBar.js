import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    add_favourite_city,
    remove_favourite_city,
    selectWeather,
    set_city,
    add_city
} from '../../redux/weatherSlices';
import styles from './cityBar.module.css';

export const CityBar = ({ city_name }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { favourite_cities } = useSelector(selectWeather);

    const isFavourite = favourite_cities.includes(city_name);

    const toggleFavourite = (e) => {
        e.stopPropagation();
        if (isFavourite) {
            dispatch(remove_favourite_city(city_name));
        } else {
            dispatch(add_favourite_city(city_name));
        }
    };

    const handleCityClick = () => {
        dispatch(set_city(city_name));
        dispatch(add_city(city_name));
        navigate(`/${city_name}`);
    };

    return (
        <div
            className={styles.container}
            onClick={handleCityClick}
        >
            <div className={styles.city_name}>{city_name}</div>
            <div className={styles.favourite_star} onClick={toggleFavourite}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={isFavourite ? 'gold' : 'none'}
                    stroke={isFavourite ? 'gold' : 'currentColor'}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.star_icon}
                >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
            </div>
        </div>
    );
};