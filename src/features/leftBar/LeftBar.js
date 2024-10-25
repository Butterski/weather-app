import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectWeather} from '../../redux/weatherSlices';
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
        </div>
    );
};
