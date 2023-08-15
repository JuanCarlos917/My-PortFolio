import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Accediendo a la variable de entorno
const baseURL = import.meta.env.VITE_BASE_URL;

// Creando una acción asíncrona para obtener la información de 'ProfessionalExp'
export const getProfessionalExp = createAsyncThunk(
    '/professionalExp',
    async () => {
        try {
            const response = await axios.get(`${baseURL}/professionalExp`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

// Creando una acción asíncrona para actualizar la información de 'ProfessionalExp'
export const updateProfessionalExp = createAsyncThunk(
    'professionalExp/updateProfessionalExp',
    async ({ id, professionalExpInfo }) => {
        try {
            const response = await axios.put(
                `${baseURL}/professionalExp/${id}`,
                professionalExpInfo,
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

// Creando una acción asíncrona para crear la información de 'ProfessionalExp'
export const createProfessionalExp = createAsyncThunk(
    'professionalExp/createProfessionalExp',
    async (professionalExpInfo) => {
        try {
            const response = await axios.post(
				`${baseURL}/professionalExp`,
				professionalExpInfo,
			);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const deleteProfessionalExp = createAsyncThunk(
    'professionalExp/deleteProfessionalExp',
    async (id) => {
        try {
            const response = await axios.delete(
                `${baseURL}/professionalExp/${id}`
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

// Creación del slice de 'ProfessionalExp'
export const professionalExpSlice = createSlice({
    name: 'professionalExp', // Nombre del slice
    initialState: {
        professionalExpInfo: null,
        id: null,
        status: 'idle',
        error: null,
        modified: false,
        experienceAdded: false,
    },
    reducers: {}, // No se definen reducers para las operaciones que no requieren un payload
    extraReducers: (builder) => {
		builder
            .addCase(getProfessionalExp.pending, (state) => {
                state.status = 'loading';
            }
        )
        .addCase(getProfessionalExp.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.professionalExpInfo = action.payload;
        }
        )
        .addCase(getProfessionalExp.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(updateProfessionalExp.pending, (state) => {
            state.status = 'loading';
        }
        )
        .addCase(updateProfessionalExp.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.professionalExpInfo = action.payload;
            state.modified = true;
        }
        )
        .addCase(updateProfessionalExp.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        }
        )
        .addCase(createProfessionalExp.pending, (state) => {
            state.status = 'loading';
        }
        )
        .addCase(createProfessionalExp.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.professionalExpInfo = action.payload;
            state.id = action.payload.id;
            state.experienceAdded = true;
        }
        )
        .addCase(createProfessionalExp.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
            state.experienceAdded = false;
        }
        )
        .addCase(deleteProfessionalExp.pending, (state) => {
            state.status = 'loading';
        }
        )
        .addCase(deleteProfessionalExp.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.professionalExpInfo = action.payload;
            state.modified = true;
			state.id = action.payload.id;
        }
        )
        .addCase(deleteProfessionalExp.rejected, (state, action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        }
        )
    }
});

// Exportando el reducer de 'Professional experience'
export default professionalExpSlice.reducer

