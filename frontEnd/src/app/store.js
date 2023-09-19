import { configureStore } from '@reduxjs/toolkit';
import aboutSlice from '../features/about/aboutSlice';
import educationSlice from '../features/education/educationSlice';
import cvSlice from '../features/cv/cvSlice';
import categorySlice from '../features/category/categorySlice';
import tagSlice from '../features/tag/tagSlice';
import teamDevSlice from '../features/teamDev/teamDevSlice';
import projectSlice from '../features/project/projectSlice';
import professionalExpSlice from '../features/professionalExp/professionalExpSlice'
import s3MediaSlice from '../features/s3Media/s3MediaSlice';
import authSlice from '../features/auth/authSlice';
import contactMe  from '../features/contactMe/contactMeSlice';

export const store = configureStore({
	reducer: {
        about: aboutSlice,
        education: educationSlice,
        cv: cvSlice,
        category: categorySlice,
        tag: tagSlice,
        teamDev: teamDevSlice,
        project: projectSlice,
        professionalExp: professionalExpSlice,
        s3Media: s3MediaSlice,
        auth: authSlice,
        contactMe: contactMe,
    },
});
