import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Accediendo a la variable de entorno
const baseURL = import.meta.env.VITE_BASE_URL;

// Creando una acción asíncrona para obtener la información de estrellas y comentarios
export const getStarRating = createAsyncThunk('/starsRating', async () => {
	try {
		const response = await axios.get(`${baseURL}/starsRating`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});

// Creando una acción asíncrona para actualizar la información de estrellas y comentarios
export const updateStarRating = createAsyncThunk(
	'/starRating/updateStarRating',
	async ({ id, starRatingInfo }) => {
		try {
			const response = await axios.put(
				`${baseURL}/starsRating/${id}`,
				starRatingInfo,
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
);

// Creando una acción asíncrona para crear la información de estrellas y comentarios
export const createStarRating = createAsyncThunk(
	'/starRating/createStarRating',
	async (starRatingInfo) => {
		try {
			const response = await axios.post(
				`${baseURL}/starsRating`,
				starRatingInfo,
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
);

// Creando una accion asincrona para eliminar la informacion de estrellas y comentarios
export const deleteStarRating = createAsyncThunk(
	'/starRating/deleteStarRating',
	async (id) => {
		try {
			const response = await axios.delete(`${baseURL}/starsRating/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
);

// Creando el slice para la información de estrellas y comentarios
const StarRatingsSlice = createSlice({
	name: 'starRating',
	initialState: {
		starRating: null,
		status: 'idle',
		error: null,
		modified: false,
	},
	reducers: {
		resetModifiedState: (state) => {
			state.modified = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getStarRating.pending, (state) => ({
				...state,
				status: 'loading',
			}))
			.addCase(getStarRating.fulfilled, (state, action) => ({
				...state,
				starRating: action.payload,
				status: 'succeeded',
			}))
			.addCase(getStarRating.rejected, (state, action) => ({
				...state,
				status: 'failed',
				error: action.error.message,
			}))
			.addCase(updateStarRating.pending, (state) => ({
				...state,
				status: 'loading',
			}))
			.addCase(updateStarRating.fulfilled, (state, action) => ({
				...state,
				starRating: action.payload,
				status: 'succeeded',
				modified: true,
			}))
			.addCase(updateStarRating.rejected, (state, action) => ({
				...state,
				status: 'failed',
				error: action.error.message,
			}))
			.addCase(createStarRating.pending, (state) => ({
				...state,
				status: 'loading',
			}))
			.addCase(createStarRating.fulfilled, (state, action) => ({
				...state,
				starRating: action.payload,
				status: 'succeeded',
			}))
			.addCase(createStarRating.rejected, (state, action) => ({
				...state,
				status: 'failed',
				error: action.error.message,
			}))
			.addCase(deleteStarRating.pending, (state) => ({
				...state,
				status: 'loading',
			}))
			.addCase(deleteStarRating.fulfilled, (state, action) => ({
				...state,
				starRating: action.payload,
				status: 'succeeded',
				modified: true,
			}))
			.addCase(deleteStarRating.rejected, (state, action) => ({
				...state,
				status: 'failed',
				error: action.error.message,
			}));
	},
});

export const { resetModifiedState } = StarRatingsSlice.actions;
export default StarRatingsSlice.reducer;
