import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Accediendo a la variable de entorno
const baseURL = import.meta.env.VITE_BASE_URL;

// Creando una acción asíncrona para obtener la información de 'Category'
export const getCategory = createAsyncThunk('/category', async () => {
	try {
		const response = await axios.get(`${baseURL}/category`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});

// Creando una acción asíncrona para actualizar la información de 'Category'
export const updateCategory = createAsyncThunk(
	'category/updateCategory',
	async ({ id, categoryInfo }) => {
        console.log(id);
		try {
			const response = await axios.put(
				`${baseURL}/category/${id}`,
				categoryInfo,
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
);

// Creando una acción asíncrona para crear la información de 'Category'
export const createCategory = createAsyncThunk(
	'category/createCategory',
	async (categoryInfo) => {
		try {
			const response = await axios.post(
				`${baseURL}/category`,
				categoryInfo,
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
);
// Creando una acción asíncrona para eliminar una 'Category'
export const deleteCategory = createAsyncThunk(
	'category/deleteCategory',
	async (id) => {
		try {
			const response = await axios.delete(`${baseURL}/category/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
);

export const categorySlice = createSlice({
	name: 'category', // Nombre del slice
	initialState: {
		categoryInfo: null,
		id: null,
		status: 'idle',
		error: null,
		modified: false,
		categoryAdded: false,
	},
	reducers: {}, // No se definen reducers para las operaciones que no requieren un payload
	extraReducers: (builder) => {
		builder
			.addCase(getCategory.pending, (state) => {
				// Al iniciar la petición, se establece el estado a 'loading'
				state.status = 'loading';
			})
			.addCase(getCategory.fulfilled, (state, action) => {
				// Al obtener la información de 'Category', se establece el estado a 'succeeded'
				state.status = 'succeeded';
				state.categoryInfo = action.payload;
				state.id = action.payload.id;
			})
			.addCase(getCategory.rejected, (state, action) => {
				// Si ocurre un error al obtener la información de 'Category', se establece el estado a 'failed'
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(createCategory.pending, (state) => {
				// Al iniciar la petición, se establece el estado a 'loading'
				state.status = 'loading';
			})
			.addCase(createCategory.fulfilled, (state, action) => {
				// Al obtener la información de 'Category', se establece el estado a 'succeeded'
				state.status = 'succeeded';
				state.categoryInfo = action.payload;
				state.id = action.payload.id;
                state.categoryAdded = true;
			})
			.addCase(createCategory.rejected, (state, action) => {
				// Si ocurre un error al obtener la información de 'Category', se establece el estado a 'failed'
				state.status = 'failed';
				state.error = action.error.message;
                state.categoryAdded = false;
			})
			.addCase(updateCategory.pending, (state) => {
				// Al iniciar la petición, se establece el estado a 'loading'
				state.status = 'loading';
				state.modified = false; // Se reinicia a false al comenzar una nueva petición
			})
			.addCase(updateCategory.fulfilled, (state, action) => {
				// Al obtener la información de 'Category', se establece el estado a 'succeeded'
				state.status = 'succeeded';
				state.categoryInfo = action.payload;
				state.id = action.payload.id;
				state.modified = true;
			})
			.addCase(updateCategory.rejected, (state, action) => {
				// Si ocurre un error al obtener la información de 'Category', se establece el estado a 'failed'
				state.status = 'failed';
				state.error = action.error.message;
				state.modified = false; // Se mantiene en false si la petición falla
			})
			.addCase(deleteCategory.pending, (state) => {
				// Al iniciar la petición, se establece el estado a 'loading'
				state.status = 'loading';
			})
			.addCase(deleteCategory.fulfilled, (state, action) => {
				// Al obtener la información de 'Category', se establece el estado a 'succeeded'
				state.status = 'succeeded';
				state.categoryInfo = action.payload;
                state.modified = true;
				state.id = action.payload.id;
			})
			.addCase(deleteCategory.rejected, (state, action) => {
				// Si ocurre un error al obtener la información de 'Category', se establece el estado a 'failed'
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

// Exportando actions
export default categorySlice.reducer;
