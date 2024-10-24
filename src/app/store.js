import { configureStore } from '@reduxjs/toolkit';
import weatherSlice from '../features/weather/weatherSlices';

export const store = configureStore({
  reducer: {
    weather: weatherSlice,
  },
});
