import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Accediendo a la variable de entorno
const baseURL = import.meta.env.VITE_BASE_URL;

// Creando una acción asíncrona para obtener la información de "Services"
export const getServices = createAsyncThunk('/services', async () => {
	try {
		const response = await axios.get(`${baseURL}/services`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});

// Creando una acción asíncrona para actualizar la información de "Services"
export const updateServices = createAsyncThunk(
	'/services/updateServices',
	async ({ id, servicesInfo }) => {
		try {
			const response = await axios.put(
				`${baseURL}/services/${id}`,
				servicesInfo,
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
);

// Creando una acción asíncrona para crear la información de "Services"
export const createServices = createAsyncThunk(
	'/services/createServices',
	async (servicesInfo) => {
		try {
			const response = await axios.post(
				`${baseURL}/services`,
				servicesInfo,
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
);

//Crenado una accion asincronica para eliminar la informacion de "Services"
export const deleteServices = createAsyncThunk(
	'/services/deleteServices',
	async (id) => {
		try {
			const response = await axios.delete(`${baseURL}/services/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
);

// Creación del slice de "Services"
const ServicesSlice = createSlice({
	name: 'services', // Nombre del Slice
	initialState: {
		servicesInfo: null,
		id: null,
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
			.addCase(getServices.pending, (state) => ({
				...state,
				status: 'loading',
			}))
			.addCase(getServices.fulfilled, (state, action) => ({
				...state,
				status: 'succeeded',
				servicesInfo: action.payload,
				id: action.payload.id,
			}))
			.addCase(getServices.rejected, (state, action) => ({
				...state,
				status: 'failed',
				error: action.error.message,
			}))
			.addCase(updateServices.pending, (state) => ({
				...state,
				status: 'loading',
			}))
			.addCase(updateServices.fulfilled, (state, action) => ({
				state,
				status: 'succeeded',
				servicesInfo: action.payload,
				modified: true,
			}))
			.addCase(updateServices.rejected, (state, action) => ({
				...state,
				status: 'failed',
				error: action.error.message,
			}))
			.addCase(createServices.pending, (state) => ({
				...state,
				status: 'loading',
			}))
			.addCase(createServices.fulfilled, (state, action) => ({
				...state,
				status: 'succeeded',
				servicesInfo: action.payload,
			}))
			.addCase(createServices.rejected, (state, action) => ({
				...state,
				status: 'failed',
				error: action.error.message,
			}))
			.addCase(deleteServices.pending, (state) => ({
				...state,
				status: 'loading',
			}))
			.addCase(deleteServices.fulfilled, (state, action) => ({
				...state,
				status: 'succeeded',
				servicesInfo: action.payload,
                modified: true,
				id: action.payload.id,
			}))
			.addCase(deleteServices.rejected, (state, action) => ({
				...state,
				status: 'failed',
				error: action.error.message,
			}));
	},
});

// Exportando acciones y reducer del slice
export const { resetModifiedState } = ServicesSlice.actions;
export default ServicesSlice.reducer;
