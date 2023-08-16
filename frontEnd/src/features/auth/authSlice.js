import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Accediendo a la variable de entorno
const baseURL = import.meta.env.VITE_BASE_URL;

export const registerUser = createAsyncThunk(
	'auth/register',
	async (credentials) => {
		try {
			const response = await axios.post(
				`${baseURL}/auth/register`,
				credentials,
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
);

export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
    try {

        const response = await axios.post(`${baseURL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        console.error(error)
    }
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
	const response = await axios.get(`${baseURL}/auth/logout`);
	return response.data;
});

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		email: null,
		password: null,
		isLoggedIn: false,
		status: 'idle',
		error: null,
		loading: false,
	},
	reducers: {
		setUser: (state, action) => {
			state.email = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.email = action.payload;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.email = action.payload.email;
				state.password = action.payload.password;
				state.isLoggedIn = true;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(logoutUser.pending, (state) => {
				state.loading = true;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.status = 'succeeded';
				state.email = null;
				state.password = null;
				state.isLoggedIn = false;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
