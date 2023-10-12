import {  configureStore } from '@reduxjs/toolkit';
import { streakSlice } from './reducer';

const store = configureStore({
	reducer: {
        streak: streakSlice.reducer
    },
});

export default store