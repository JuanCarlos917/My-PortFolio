import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Accediendo a la variable de entorno
const baseURL = import.meta.env.VITE_BASE_URL;

export const postContactMe = createAsyncThunk(
	'/contactMe',
	async (formData) => {
		try {
			const response = await axios.post(`${baseURL}/contactMe`, formData);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	},
);



const contactMeSlice = createSlice({
	name: 'contactMe',
	initialState: {
		contactMe: '',
		status: 'idle',
		error: null,
		send: false,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(postContactMe.pending, (state) => {
				state.status = 'loading';
                state.send = false
			})
			.addCase(postContactMe.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.contactMe = action.payload;
                state.send = true;
			})
			.addCase(postContactMe.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default contactMeSlice.reducer;