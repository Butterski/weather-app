import {configureStore} from '@reduxjs/toolkit';
import weatherSlice from './weatherSlices';

export const store = configureStore({
    reducer: {
        weather: weatherSlice,
    },
});
