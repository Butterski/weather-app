import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  set_city,
  add_city,
  set_temperature_unit,
  set_current_temperature,
  selectWeather,
} from './weatherSlices';
import styles from './weather.module.css';

export const Weather = () => {
  const weather = useSelector(selectWeather);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <h1>Current City: {weather.actual_city}</h1>
      {['Wrocław', 'Oleśnica', 'Warszawa'].map(city => (
        <button
          key={city}
          onClick={() => {
            dispatch(set_city(city));
          }}
        >
          {city}
        </button>
      ))}

      <hr />
      <h2>
        Temperature: {weather.current_temperature}°{weather.temperature_unit}
      </h2>
      <button
        onClick={() => {
          dispatch(set_current_temperature(weather.current_temperature + 1));
        }}
      >
        Increment Temperature
      </button>
      <button
        onClick={() => {
          dispatch(set_current_temperature(weather.current_temperature - 1));
        }}
      >
        Decrement Temperature
      </button>
      <br />
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
      <hr />
      <h3>Favourite Cities:</h3>
      <ul>
        {weather.favourite_cities.map(city => (
          <li key={city}>{city}</li>
        ))}
      </ul>
      <hr />

      <h3>City History:</h3>
      {['Wrocław', 'Oleśnica', 'Warszawa'].map(city => (
        <button
          key={city}
          onClick={() => {
            dispatch(add_city(city));
          }}
        >
          {city}
        </button>
      ))}
      <ul>
        {weather.city_history.map((city, index) => (
          <li key={index}>{city}</li>
        ))}
      </ul>
    </div>
  );
};
