import React, {useState, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {selectWeather, set_weather_data} from '../../redux/weatherSlices';
import {ArrowUp, RefreshCw, Home} from 'lucide-react';
import styles from './weather.module.css';

const getWeatherEmoji = condition => {
    const weatherMap = {
        Clear: '☀️',
        Clouds: '☁️',
        Rain: '🌧️',
        Drizzle: '🌦️',
        Thunderstorm: '⛈️',
        Snow: '🌨️',
        Mist: '🌫️',
        Fog: '🌫️',
        Haze: '🌫️',
    };
    return weatherMap[condition] || '❓';
};

const getWindDirection = degrees => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index =
        Math.round(((degrees %= 360) < 0 ? degrees + 360 : degrees) / 45) % 8;
    return directions[index];
};

export const Weather = () => {
    const weather = useSelector(selectWeather);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [forecast, setForecast] = useState([]);

    const fetchWeatherData = useCallback(async () => {
        const API_KEY = '650d0d4b7a63037f35001c903db11419';
        const units = weather.temperature_unit === 'C' ? 'metric' : 'imperial';

        try {
            const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weather.actual_city}&appid=${API_KEY}&units=${units}`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${weather.actual_city}&appid=${API_KEY}&units=${units}`;

            const [currentWeatherResponse, forecastResponse] =
                await Promise.all([
                    axios.get(currentWeatherUrl),
                    axios.get(forecastUrl),
                ]);

            dispatch(set_weather_data(currentWeatherResponse.data));

            const dailyForecasts = forecastResponse.data.list
                .filter(item => item.dt_txt.includes('12:00:00'))
                .slice(0, 5);

            setForecast(dailyForecasts);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setLoading(false);
        }
    }, [weather.actual_city, weather.temperature_unit, dispatch]);

    useEffect(() => {
        if (weather.actual_city) {
            fetchWeatherData();
        }
    }, [weather.actual_city, weather.temperature_unit, fetchWeatherData]);

    const refreshData = () => {
        setLoading(true);
        fetchWeatherData();
    };

    if (loading || !weather.weather_data) {
        return (
            <div className="loading-container">
                <div className="loading-spinner">⌛</div>
            </div>
        );
    }

    const {main, weather: weatherDetails, wind, clouds} = weather.weather_data;

    return (
        <div className={styles.weather_container}>
            <div className={styles.header_buttons}>
                <button onClick={refreshData} className={styles.action_button}>
                    <RefreshCw className={styles.icon} />
                </button>
                <button
                    onClick={() => navigate('/')}
                    className={styles.action_button}
                >
                    <Home className={styles.icon} />
                </button>
            </div>

            <div className={styles.current_weather}>
                <h2 className={styles.city_name}>{weather.actual_city}</h2>
                <div className={styles.current_temp}>
                    {main.temp}°{weather.temperature_unit}
                    <span className={styles.weather_emoji}>
                        {getWeatherEmoji(weatherDetails[0].main)}
                    </span>
                </div>

                <div className={styles.weather_details}>
                    <div className={styles.detail_card}>
                        <h3>Precipitation</h3>
                        <p>
                            {weather.weather_data.rain
                                ? `${weather.weather_data.rain['1h']} mm/h`
                                : '0 mm/h'}
                        </p>
                        <p>Chance: {main.humidity}%</p>
                    </div>

                    <div className={styles.detail_card}>
                        <h3>Wind</h3>
                        <p>{wind.speed} m/s</p>
                        <p className={styles.wind_direction}>
                            Direction: {getWindDirection(wind.deg)}
                            <ArrowUp
                                className={styles.wind_arrow}
                                style={{transform: `rotate(${wind.deg}deg)`}}
                            />
                        </p>
                    </div>

                    <div className={styles.detail_card}>
                        <h3>Cloud Cover</h3>
                        <p>{clouds.all}%</p>
                    </div>
                </div>
            </div>

            <div className={styles.forecast}>
                <h3>5-Day Forecast</h3>
                <div className={styles.forecast_grid}>
                    {forecast.map((day, index) => (
                        <div key={index} className={styles.forecast_card}>
                            <p className={styles.day_name}>
                                {new Date(day.dt * 1000).toLocaleDateString(
                                    'en-US',
                                    {weekday: 'short'},
                                )}
                            </p>
                            <div className={styles.forecast_emoji}>
                                {getWeatherEmoji(day.weather[0].main)}
                            </div>
                            <p className={styles.forecast_temp}>
                                {Math.round(day.main.temp)}°
                                {weather.temperature_unit}
                            </p>
                            <p className={styles.forecast_desc}>
                                {day.weather[0].description}
                            </p>
                            <p className={styles.forecast_rain}>
                                Rain: {Math.round(day.pop * 100)}%
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
