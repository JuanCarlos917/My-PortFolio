import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Accediendo a la variable de entorno
const baseURL = import.meta.env.VITE_BASE_URL;

// Creando una acción asíncrona para obtener la información de 'About'
export const getAbout = createAsyncThunk('/about', async () => {
	try {
		const response = await axios.get(`${baseURL}/about`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});

// Creando una acción asíncrona para actualizar la información de 'About'
export const updateAbout = createAsyncThunk(
	'about/updateAbout',
	async ({ id, aboutInfo }) => {
		try {
			const response = await axios.put(
				`${baseURL}/about/${id}`,
				aboutInfo,
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
);

// Creando una acción asíncrona para crear la información de 'About'
export const createAbout = createAsyncThunk(
	'about/createAbout',
	async (aboutInfo) => {
		try {
			const response = await axios.post(`${baseURL}/about`, aboutInfo);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
);

// Creación del slice de 'About'
export const aboutSlice = createSlice({
	name: 'about', // Nombre del slice
	initialState: {
		aboutInfo: null,
		id: null,
		status: 'idle',
		error: null,
		modified: false,
	},
	reducers: {}, // No se definen reducers para las operaciones que no requieren un payload
	extraReducers: (builder) => {
		builder
			.addCase(getAbout.pending, (state) => {
				// Al iniciar la petición, se establece el estado a 'loading'
				state.status = 'loading';
			})
			.addCase(getAbout.fulfilled, (state, action) => {
				// Una vez que la petición se ha completado con éxito, se actualizan los datos y el estado
				state.status = 'succeeded';
				state.aboutInfo = action.payload;
				state.id = action.payload.id;
			})
			.addCase(getAbout.rejected, (state, action) => {
				// En caso de error, se establece el estado a 'failed' y se guarda el mensaje de error
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(createAbout.pending, (state) => {
				// Al iniciar la petición, se establece el estado a 'loading'
				state.status = 'loading';
			})
			.addCase(createAbout.fulfilled, (state, action) => {
				// Una vez que la petición se ha completado con éxito, se actualizan los datos y el estado
				state.status = 'succeeded';
				state.aboutInfo = action.payload;
				state.id = action.payload.id;
			})
			.addCase(createAbout.rejected, (state, action) => {
				// En caso de error, se establece el estado a 'failed' y se guarda el mensaje de error
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(updateAbout.pending, (state) => {
				state.status = 'loading';
				state.modified = false; // Se reinicia a false al comenzar una nueva petición
			})
			.addCase(updateAbout.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.aboutInfo = action.payload;
				state.id = action.payload.id;
				state.modified = true; // Se establece a true cuando la petición se completa con éxito
			})
			.addCase(updateAbout.rejected, (state, action) => {
				// En caso de error, se establece el estado a 'failed' y se guarda el mensaje de error
				state.status = 'failed';
				state.error = action.error.message;
				state.modified = false; // Se mantiene en false si la petición falla
			});
	},
});

// Exportando las acciones síncronas
export default aboutSlice.reducer;
