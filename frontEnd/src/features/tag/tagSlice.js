import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Accediendo a la variable de entorno
const baseURL = import.meta.env.VITE_BASE_URL;

// Creando una acción asíncrona para obtener la información de 'Tag'
export const getTag = createAsyncThunk('/tag', async () => {
	try {
		const response = await axios.get(`${baseURL}/tag`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});

// Creando una acción asíncrona para actualizar la información de 'Tag'
export const updateTag = createAsyncThunk(
	'tag/updateTag',
	async ({ id, tagInfo }) => {
		try {
			const response = await axios.put(`${baseURL}/tag/${id}`, tagInfo);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
);

// Creando una acción asíncrona para crear la información de 'Tag'
export const createTag = createAsyncThunk('tag/createTag', async (tagInfo) => {
	try {
		const response = await axios.post(`${baseURL}/tag`, tagInfo);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});

// Creando una acción asíncrona para eliminar una 'Tag'
export const deleteTag = createAsyncThunk('tag/deleteTag', async (id) => {
	try {
		const response = await axios.delete(`${baseURL}/tag/${id}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});

// Creando el slice de 'Tag'
const tagSlice = createSlice({
	name: 'tag', // Nombre del slice
	initialState: {
		tagInfo: null,
		id: null,
		status: 'idle',
		error: null,
		modified: false,
		tagyAdded: false,
	},
	reducers: {}, // No se definen reducers para las operaciones que no requieren un payload
	extraReducers: (builder) => {
		// Obteniendo la información de 'Tag'
		builder.addCase(getTag.pending, (state) => {
			// Al iniciar la petición, se establece el estado a 'loading'
			state.status = 'loading';
		});
		builder.addCase(getTag.fulfilled, (state, action) => {
			// Al obtener la información de 'Tag', se establece el estado a 'succeeded'
			state.status = 'succeeded';
			state.tagInfo = action.payload;
			state.id = action.payload.id;
		});
		builder.addCase(getTag.rejected, (state, action) => {
			// Si ocurre un error al obtener la información de 'Category', se establece el estado a 'failed'
			state.status = 'failed';
			state.error = action.error.message;
		});

		// Actualizando la información de 'Tag'
		builder.addCase(updateTag.pending, (state) => {
			// Al iniciar la petición, se establece el estado a 'loading'
			state.status = 'loading';
			state.modified = false; // Se reinicia a false al comenzar una nueva petición
		});
		builder.addCase(updateTag.fulfilled, (state, action) => {
			// Al obtener la información de 'Tag', se establece el estado a 'succeeded'
			state.status = 'succeeded';
			state.tagInfo = action.payload;
			state.id = action.payload.id;
			state.modified = true;
		});
		builder.addCase(updateTag.rejected, (state, action) => {
			// Si ocurre un error al obtener la información de 'Category', se establece el estado a 'failed'
			state.status = 'failed';
			state.error = action.error.message;
			state.modified = false; // Se mantiene en false si la petición falla
		});

		// Creando la información de 'Tag'
		builder.addCase(createTag.pending, (state) => {
			// Al iniciar la petición, se establece el estado a 'loading'
			state.status = 'loading';
		});
		builder.addCase(createTag.fulfilled, (state, action) => {
			// Al obtener la información de 'Tag', se establece el estado a 'succeeded'
			state.status = 'succeeded';
			state.tagyAdded = true;
			state.tagInfo = action.payload;
		});
		builder.addCase(createTag.rejected, (state, action) => {
			// Si ocurre un error al obtener la información de 'Category', se establece el estado a 'failed'
			state.status = 'failed';
			state.error = action.error.message;
			state.tagyAdded = false; // Se mantiene en false si la petición falla
		});

		// Eliminando la información de 'Tag'
		builder.addCase(deleteTag.pending, (state) => {
			// Al iniciar la petición, se establece el estado a 'loading'
			state.status = 'loading';
		});
		builder.addCase(deleteTag.fulfilled, (state, action) => {
			// Al obtener la información de 'Tag', se establece el estado a 'succeeded'
			state.status = 'succeeded';
			state.tagInfo = action.payload;
			state.modified = true;
			state.id = action.payload.id;
		});
		builder.addCase(deleteTag.rejected, (state, action) => {
			// Si ocurre un error al obtener la información de 'Category', se establece el estado a 'failed'
			state.status = 'failed';
			state.error = action.error.message;
		});
	},
});

// Exportando acciones
export default tagSlice.reducer;
