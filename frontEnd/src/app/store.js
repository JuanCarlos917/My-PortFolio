import { configureStore } from '@reduxjs/toolkit';
import aboutSlice from '../features/about/aboutSlice';
import educationSlice from '../features/education/educationSlice';
import cvSlice from '../features/cv/cvSlice';
import categorySlice from '../features/category/categorySlice';

export const store = configureStore({
	reducer: {
        about: aboutSlice,
        education: educationSlice,
        cv: cvSlice,
        category: categorySlice,
    },
});
