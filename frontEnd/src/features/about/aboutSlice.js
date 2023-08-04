import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Accediendo a la variable de entorno
const baseURL = import.meta.env.VITE_BASE_URL;

// Creando una acción asíncrona para obtener la información de 'About'
export const getAbout = createAsyncThunk('/about', async () => {
    const response = await axios.get(`${baseURL}/about`);
    return response.data;
});

// Creando una acción asíncrona para actualizar la información de 'About'
export const updateAbout = createAsyncThunk(
    'about/updateAbout',
    async (aboutInfo) => {
        const response = await axios.put(`${baseURL}/about`, aboutInfo);
        return response.data;
    },
);

// Creando una acción asíncrona para crear la información de 'About'
export const createAbout = createAsyncThunk(
	'about/createAbout',
	async (aboutInfo) => {
		const response = await axios.post(`${baseURL}/about`, aboutInfo);
		return response.data;
	},
);



// Creación del slice de 'About'
export const aboutSlice = createSlice({
	name: 'about',
	initialState: {
		aboutInfo: null,
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAbout.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getAbout.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.aboutInfo = action.payload;
			})
			.addCase(getAbout.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(createAbout.fulfilled, (state, action) => {
				state.aboutInfo = action.payload;
			})
			.addCase(updateAbout.fulfilled, (state, action) => {
				state.aboutInfo = action.payload;
			});
	},
});

// Exportando las acciones síncronas
export default aboutSlice.reducer;
