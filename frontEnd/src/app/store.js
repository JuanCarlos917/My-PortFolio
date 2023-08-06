import { configureStore } from '@reduxjs/toolkit';
import aboutSlice from '../features/about/aboutSlice';
import educationSlice from '../features/education/educationSlice';

export const store = configureStore({
	reducer: {
        about: aboutSlice,
        education: educationSlice
    },
});
