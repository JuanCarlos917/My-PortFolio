import { configureStore } from '@reduxjs/toolkit';
import aboutSlice from '../features/about/aboutSlice';
import educationSlice from '../features/education/educationSlice';
import cvSlice from '../features/cv/cvSlice';

export const store = configureStore({
	reducer: {
        about: aboutSlice,
        education: educationSlice,
        cv: cvSlice,
    },
});
