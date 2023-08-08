import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Accediendo a la variable de entorno
const baseURL = import.meta.env.VITE_BASE_URL;

// Creando una acción asíncrona para obtener la información de 'Education'
export const getEducation = createAsyncThunk('/education', async () => {
	try {
		const response = await axios.get(`${baseURL}/education`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});

// Creando una acción asíncrona para actualizar la información de 'Education'
export const updateEducation = createAsyncThunk(
    'education/updateEducation',
    async ({ id, educationInfo }) => {
        try {
            const response = await axios.put(
                `${baseURL}/education/${id}`,
                educationInfo,
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

// Creando una acción asíncrona para crear la información de 'Education'
export const createEducation = createAsyncThunk(
    'education/createEducation',
    async (educationInfo) => {
        try {
            const response = await axios.post(`${baseURL}/education`, educationInfo);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const deleteEducation = createAsyncThunk(
    'education/deleteEducation',
    async (id) => {
        try {
            const response = await axios.delete(`${baseURL}/education/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
)

// Creación del slice de 'Education'
export const educationSlice = createSlice({
    name: 'education', // Nombre del slice
    initialState: {
        educationInfo: null,
        id: null,
        status: 'idle',
        error: null,
        modified: false,
    },
    reducers: {}, // No se definen reducers para las operaciones que no requieren un payload
    extraReducers: (builder) => {
        builder
            .addCase(getEducation.pending, (state) => {
                // Al iniciar la petición, se establece el estado a 'loading'
                state.status = 'loading';
            })
            .addCase(getEducation.fulfilled, (state, action) => {
                // Al obtener la información de 'Education', se establece el estado a 'succeeded'
                state.status = 'succeeded';
                state.educationInfo = action.payload;
            })
            .addCase(getEducation.rejected, (state, action) => {
                // Si ocurre un error al obtener la información de 'Education', se establece el estado a 'failed'
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateEducation.pending, (state) => {
                // Al iniciar la petición, se establece el estado a 'loading'
                state.status = 'loading';
            })
            .addCase(updateEducation.fulfilled, (state, action) => {
                // Al actualizar la información de 'Education', se establece el estado a 'succeeded'
                state.status = 'succeeded';
                state.educationInfo = action.payload;
                state.modified = true;
            })
            .addCase(updateEducation.rejected, (state, action) => {
                // Si ocurre un error al actualizar la información de 'Education', se establece el estado a 'failed'
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createEducation.pending, (state) => {
                // Al iniciar la petición, se establece el estado a 'loading'
                state.status = 'loading';
            })
            .addCase(createEducation.fulfilled, (state, action) => {
                // Al crear la información de 'Education', se establece el estado a 'succeeded'
                state.status = 'succeeded';
                state.educationInfo = action.payload;
                state.id = action.payload.id;
            })
            .addCase(createEducation.rejected, (state, action) => {
                // Si ocurre un error al crear la información de 'Education', se establece el estado a 'failed'
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteEducation.pending, (state)=>{
				// Al iniciar la petición, se establece el estado a 'loading'
				state.status = 'loading';
			})
            .addCase(deleteEducation.fulfilled, (state, action)=>{
                // Al eliminar la información de 'Education', se establece el estado a 'succeeded'
                state.status = 'succeeded';
                state.educationInfo = action.payload;
                state.modified = true;
                state.id = action.payload.id;
            })
            .addCase(deleteEducation.rejected, (state, action)=>{
                // Si ocurre un error al eliminar la información de 'Education', se establece el estado a 'failed'
                state.status = 'failed';
                state.error = action.error.message;
            }
        );
    }
});

// Exportando el reducer de 'Education'
export default educationSlice.reducer;