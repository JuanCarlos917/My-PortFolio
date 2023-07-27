import { configureStore } from '@reduxjs/toolkit';
import aboutSlice from '../features/about/aboutSlice';

export const store = configureStore({
	reducer: {
        about: aboutSlice,
    },
});
