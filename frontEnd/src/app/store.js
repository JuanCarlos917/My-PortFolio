import { configureStore } from '@reduxjs/toolkit';
import aboutSlice from '../features/about/aboutSlice';
import educationSlice from '../features/education/educationSlice';
import cvSlice from '../features/cv/cvSlice';
import categorySlice from '../features/category/categorySlice';
import tagSlice from '../features/tag/tagSlice';
import teamDevSlice from '../features/teamDev/teamDevSlice';
import projectSlice from '../features/project/projectSlice';

export const store = configureStore({
	reducer: {
        about: aboutSlice,
        education: educationSlice,
        cv: cvSlice,
        category: categorySlice,
        tag: tagSlice,
        teamDev: teamDevSlice,
        project: projectSlice,
    },
});
