import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  actual_city: 'Wrocław',
  city_history: [],
  favourite_cities: ['Oleśnica', 'Wrocław'],
  temperature_unit: 'C',
  current_temperature: 0,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    set_city: (state, action) => {
      state.actual_city = action.payload;
    },
    add_city: (state, action) => {
      (state.city_history.length > 5) && state.city_history.shift();
      state.city_history.push(action.payload);
    },
    set_temperature_unit: (state, action) => {
      state.temperature_unit = action.payload;
    },
    set_current_temperature: (state, action) => {
      state.current_temperature = action.payload;
    },
    add_favourite_city: (state, action) => {
      state.favourite_cities.push(action.payload);
    },
    remove_favourite_city: (state, action) => {
      state.favourite_cities = state.favourite_cities.filter(
        city => city !== action.payload,
      );
    },
  },
});

export const {
  set_city,
  add_city,
  set_temperature_unit,
  set_current_temperature,
} = weatherSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectWeather = state => state.weather;

export default weatherSlice.reducer;
