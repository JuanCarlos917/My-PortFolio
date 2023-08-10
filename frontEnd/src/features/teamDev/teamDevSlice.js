import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Accediendo a la variable de entorno
const baseURL = import.meta.env.VITE_BASE_URL;

// Creando una acción asíncrona para obtener la información de 'TeamDev'
export const getTeamDev = createAsyncThunk('/teamDev', async () => {
	try {
		const response = await axios.get(`${baseURL}/teamDev`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});

// Creando una acción asíncrona para actualizar la información de 'TeamDev'
export const updateTeamDev = createAsyncThunk(
	'teamDev/updateTeamDev',
	async ({ id, teamDevInfo }) => {
		try {
			const response = await axios.put(
				`${baseURL}/teamDev/${id}`,
				teamDevInfo,
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
);

// Creando una acción asíncrona para crear la información de 'TeamDev'
export const createTeamDev = createAsyncThunk(
	'teamDev/createTeamDev',
	async (teamDevInfo) => {
		try {
			const response = await axios.post(
				`${baseURL}/teamDev`,
				teamDevInfo,
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
);

// Creando una acción asíncrona para eliminar una 'TeamDev'
export const deleteTeamDev = createAsyncThunk(
	'teamDev/deleteTeamDev',
	async (id) => {
		try {
			const response = await axios.delete(`${baseURL}/teamDev/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
);

// Creando el slice de 'TeamDev'
const teamDevSlice = createSlice({
	name: 'teamDev', // Nombre del slice
	initialState: {
		teamDevInfo: null,
		id: null,
		status: 'idle',
		error: null,
		modified: false,
		teamDevAdded: false,
	},
	reducers: {}, // No se definen reducers para las operaciones que no requieren un payload
	extraReducers: (builder) => {
		// Agregando reducers para las operaciones que requieren un payload
		// getTeamDev
		builder.addCase(getTeamDev.pending, (state) => {
			state.status = 'loading';
		});
		builder.addCase(getTeamDev.fulfilled, (state, action) => {
			state.status = 'succeeded';
			state.teamDevInfo = action.payload;
			state.id = action.payload.id;
		});
		builder.addCase(getTeamDev.rejected, (state, action) => {
			state.status = 'failed';
			state.error = action.message;
		});
		// updateTeamDev
		builder.addCase(updateTeamDev.pending, (state) => {
			state.status = 'loading';
		});
		builder.addCase(updateTeamDev.fulfilled, (state, action) => {
			state.status = 'succeeded';
			state.teamDevInfo = action.payload;
			state.id = action.payload.id;
			state.modified = true;
		});
		builder.addCase(updateTeamDev.rejected, (state, action) => {
			state.status = 'failed';
			state.error = action.message;
			state.modified = false; // Se mantiene en false si la petición falla
		});
		// createTeamDev
		builder.addCase(createTeamDev.pending, (state) => {
			state.status = 'loading';
		});
		builder.addCase(createTeamDev.fulfilled, (state, action) => {
			state.status = 'succeeded';
			state.teamDevInfo = action.payload;
			state.teamDevAdded = true;
		});
		builder.addCase(createTeamDev.rejected, (state, action) => {
			state.status = 'failed';
			state.error = action.message;
			state.teamDevAdded = false; // Se mantiene en false si la petición falla
		});
		// deleteTeamDev
		builder.addCase(deleteTeamDev.pending, (state) => {
			state.status = 'loading';
		});
		builder.addCase(deleteTeamDev.fulfilled, (state, action) => {
			state.status = 'succeeded';
			state.teamDevInfo = action.payload;
			state.modified = true;
			state.id = action.payload.id;
		});
		builder.addCase(deleteTeamDev.rejected, (state, action) => {
			state.status = 'failed';
			state.error = action.message;
		});
	},
});

// Exportando acciones
export default teamDevSlice.reducer;
