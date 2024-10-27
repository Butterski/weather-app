import {selectWeather, set_weather_data} from '../../redux/weatherSlices';
import styles from './weather.module.css';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {useState, useEffect, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

export const Weather = () => {
    const weather = useSelector(selectWeather);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [apiCalled, setApiCalled] = useState(false);
    const [loading, setLoading] = useState(true);

    const callWeatherApi = useCallback(() => {
        const url_with_key = `https://api.openweathermap.org/data/2.5/weather?q=${
            weather.actual_city
        }&appid=650d0d4b7a63037f35001c903db11419&units=${
            weather.temperature_unit === 'C' ? 'metric' : 'imperial'
        }`;
        axios
            .get(url_with_key)
            .then(response => {
                dispatch(set_weather_data(response.data));
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
        setApiCalled(true);
    }, [dispatch, weather.actual_city, weather.temperature_unit]);

    const refreshData = () => {
        setLoading(true);
        callWeatherApi();
    };

    useEffect(() => {
        if (weather.actual_city) {
            callWeatherApi();
        }
    }, [weather.actual_city, weather.temperature_unit, callWeatherApi]);

    const getBackgroundStyle = (temperature, unit) => {
        const tempInCelsius =
            unit === 'F' ? ((temperature - 32) * 5) / 9 : temperature;

        if (tempInCelsius <= -10) {
            return 'radial-gradient(circle, rgba(0, 0, 255, 0.3), rgba(0, 0, 139, 0.3))'; // Very cold
        } else if (tempInCelsius > -10 && tempInCelsius <= 0) {
            return 'radial-gradient(circle, rgba(0, 198, 255, 0.3), rgba(0, 114, 255, 0.3))'; // Cold
        } else if (tempInCelsius > 0 && tempInCelsius <= 10) {
            return 'radial-gradient(circle, rgba(173, 216, 230, 0.3), rgba(135, 206, 250, 0.3))'; // Cool
        } else if (tempInCelsius > 10 && tempInCelsius <= 20) {
            return 'radial-gradient(circle, rgba(144, 238, 144, 0.3), rgba(60, 179, 113, 0.3))'; // Mild
        } else if (tempInCelsius > 20 && tempInCelsius <= 30) {
            return 'radial-gradient(circle, rgba(253, 219, 146, 0.3), rgba(209, 253, 255, 0.3))'; // Warm
        } else if (tempInCelsius > 30 && tempInCelsius <= 40) {
            return 'radial-gradient(circle, rgba(255, 165, 0, 0.3), rgba(255, 69, 0, 0.3))'; // Hot
        } else {
            return 'radial-gradient(circle, rgba(255, 0, 0, 0.3), rgba(139, 0, 0, 0.3))'; // Very hot
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const {main, weather: weatherDetails, wind, sys} = weather.weather_data;

    return (
        apiCalled &&
        weather.current_temperature !== undefined && (
            <div
                className={styles.container}
                style={{
                    background: getBackgroundStyle(weather.current_temperature, weather.temperature_unit),
                }}
            >
                <div className={styles.topRightButtons}>
                    <button onClick={refreshData}>Refresh</button>
                    <button onClick={() => navigate('/')}>Home</button>
                </div>
                <div>
                    <div className={styles.city}>{weather.actual_city}</div>
                    <div className={styles.temperature}>
                        {weather.current_temperature}°{weather.temperature_unit}
                    </div>
                    <div className={styles.details}>
                        <div className={styles.detailItem}>
                            <strong>Weather:</strong> {weatherDetails[0].main} (
                            {weatherDetails[0].description})
                        </div>
                        <div className={styles.detailItem}>
                            <strong>Temperature:</strong> {main.temp}°C
                        </div>
                        <div className={styles.detailItem}>
                            <strong>Feels Like:</strong> {main.feels_like}°C
                        </div>
                        <div className={styles.detailItem}>
                            <strong>Humidity:</strong> {main.humidity}%
                        </div>
                        <div className={styles.detailItem}>
                            <strong>Wind Speed:</strong> {wind.speed} m/s
                        </div>
                        <div className={styles.detailItem}>
                            <strong>Country:</strong> {sys.country}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
