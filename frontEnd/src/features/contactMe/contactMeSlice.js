import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Accediendo a la variable de entorno
const baseURL = import.meta.env.VITE_BASE_URL;

export const postContactMe = createAsyncThunk('/contactMe', async () =>{
    try {
        const response = await axios.post(`${baseURL}/contactMe`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

const contactMeSlice = createSlice({
    name: 'contactMe',
    initialState: {
        contactMe: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postContactMe.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postContactMe.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.contactMe = state.contactMe.concat(action.payload);
            })
            .addCase(postContactMe.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default contactMeSlice.reducer;