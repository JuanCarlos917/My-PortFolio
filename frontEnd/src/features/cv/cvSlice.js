import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Accediendo a la variable de entorno
const baseURL = import.meta.env.VITE_BASE_URL;

// Creando una acción asíncrona para obtener la información de 'CV'
export const getCV = createAsyncThunk('/cv', async () => {
	try {
		const response = await axios.get(`${baseURL}/cv`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});

// Creando una acción asíncrona para actualizar la información de 'CV'
export const updateCV = createAsyncThunk(
	'cv/updateCV',
	async ({ id, cvInfo }) => {
		try {
			const response = await axios.put(`${baseURL}/cv/${id}`, cvInfo);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
);

// Creando una acción asíncrona para crear la información de 'CV'
export const createCV = createAsyncThunk('cv/createCV', async (cvInfo) => {
	try {
		const response = await axios.post(`${baseURL}/cv`, cvInfo);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});

export const cvSlice = createSlice({
	name: 'cv', // Nombre del slice
	initialState: {
		cvInfo: null,
		id: null,
		status: 'idle',
		error: null,
		modified: false,
	},
	reducers: {}, // No se definen reducers para las operaciones que no requieren un payload
	extraReducers: (builder) => {
		builder
			.addCase(getCV.pending, (state) => {
				// Al iniciar la petición, se establece el estado a 'loading'
				state.status = 'loading';
			})
			.addCase(getCV.fulfilled, (state, action) => {
				// Al obtener la información de 'Education', se establece el estado a 'succeeded'
				state.status = 'succeeded';
				state.cvInfo = action.payload;
				state.id = action.payload.id;
			})
			.addCase(getCV.rejected, (state, action) => {
				// Si ocurre un error al obtener la información de 'Education', se establece el estado a 'failed'
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(createCV.pending, (state) => {
				// Al iniciar la petición, se establece el estado a 'loading'
				state.status = 'loading';
			})
			.addCase(createCV.fulfilled, (state, action) => {
				// Al obtener la información de 'Education', se establece el estado a 'succeeded'
				state.status = 'succeeded';
				state.cvInfo = action.payload;
				state.id = action.payload.id;
			})
			.addCase(createCV.rejected, (state, action) => {
				// Si ocurre un error al obtener la información de 'Education', se establece el estado a 'failed'
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(updateCV.pending, (state) => {
				// Al iniciar la petición, se establece el estado a 'loading'
				state.status = 'loading';
				state.modified = false; // Se reinicia a false al comenzar una nueva petición
			})
			.addCase(updateCV.fulfilled, (state, action) => {
				// Al obtener la información de 'Education', se establece el estado a 'succeeded'
				state.status = 'succeeded';
				state.cvInfo = action.payload;
				state.id = action.payload.id;
				state.modified = true;
			})
			.addCase(updateCV.rejected, (state, action) => {
				// Si ocurre un error al obtener la información de 'Education', se establece el estado a 'failed'
				state.status = 'failed';
				state.error = action.error.message;
				state.modified = false; // Se mantiene en false si la petición falla
			});
	},
});

// Exportando las acciones síncronas
export default cvSlice.reducer;
