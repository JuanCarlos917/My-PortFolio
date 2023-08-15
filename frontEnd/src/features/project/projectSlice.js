import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Accediendo a la variable de entorno
const baseURL = import.meta.env.VITE_BASE_URL;

// Creando una acción asíncrona para obtener la información de 'Project'
export const getProject = createAsyncThunk('/project', async () => {
	try {
		const response = await axios.get(`${baseURL}/project`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});

// Creando una acción asíncrona para actualizar la información de 'Project'
export const updateProject = createAsyncThunk(
	'project/updateProject',
	async ({ id, projectInfo }) => {
        console.log('Enviando:', projectInfo);
		try {
			const response = await axios.put(
				`${baseURL}/project/${id}`,
				projectInfo,
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
);

// Creando una acción asíncrona para crear la información de 'Project'
export const createProject = createAsyncThunk(
	'project/createProject',
	async (projectInfo) => {
		try {
			const response = await axios.post(
				`${baseURL}/project`,
				projectInfo,
			);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
);
// Creando una acción asíncrona para eliminar un 'Porject'
export const deleteProject = createAsyncThunk(
	'project/deletePoject',
	async (id) => {
		try {
			const response = await axios.delete(`${baseURL}/project/${id}`);
			return response.data;
		} catch (error) {
			console.log(error);
		}
	},
);

export const projectSlice = createSlice({
	name: 'project', // Nombre del slice
	initialState: {
		projectInfo: null,
		id: null,
		status: 'idle',
		error: null,
		modified: false,
		projectAdded: false,
	},
	reducers: {}, // No se definen reducers para las operaciones que no requieren un payload
	extraReducers: (builder) => {
		builder
			// Obteniendo la información de 'Project'
			.addCase(getProject.pending, (state) => {
				// Al iniciar la petición, se establece el estado a 'loading'
				state.status = 'loading';
			})
			.addCase(getProject.fulfilled, (state, action) => {
				// Al obtener la información de 'Project', se establece el estado a 'succeeded'
				state.status = 'succeeded';
				state.projectInfo = action.payload;
				state.id = action.payload.id;
			})
			.addCase(getProject.rejected, (state, action) => {
				// Si ocurre un error al obtener la información de 'Project', se establece el estado a 'failed'
				state.status = 'failed';
				state.error = action.error.message;
			})

			// Actualizando la información de 'Project'
			.addCase(updateProject.pending, (state) => {
				// Al iniciar la petición, se establece el estado a 'loading'
				state.status = 'loading';
				state.modified = false; // Se reinicia a false al comenzar una nueva petición
			})
			.addCase(updateProject.fulfilled, (state, action) => {
				// Al actualizar la información de 'Project', se establece el estado a 'succeeded'
				state.status = 'succeeded';
				state.projectInfo = action.payload;
				state.id = action.payload.id;
				state.modified = true;
			})
			.addCase(updateProject.rejected, (state, action) => {
				// Si ocurre un error al actualizar la información de 'Project', se establece el estado a 'failed'
				state.status = 'failed';
				state.error = action.error.message;
				state.modified = false; // Se mantiene en false si la petición falla
			})

			// Creando la información de 'Project'
			.addCase(createProject.pending, (state) => {
				// Al iniciar la petición, se establece el estado a 'loading'
				state.status = 'loading';
			})
			.addCase(createProject.fulfilled, (state, action) => {
				// Al crear la información de 'Project', se establece el estado a 'succeeded'
				state.status = 'succeeded';
				state.projectInfo = action.payload;
				state.id = action.payload.id;
				state.projectAdded = true;
			})
			.addCase(createProject.rejected, (state, action) => {
				// Si ocurre un error al crear la información de 'Project', se establece el estado a 'failed'
				state.status = 'failed';
				state.error = action.error.message;
				state.projectAdded = false;
			})

			// Eliminando la información de 'Project'
			.addCase(deleteProject.pending, (state) => {
				// Al iniciar la petición, se establece el estado a 'loading'
				state.status = 'loading';
			})
			.addCase(deleteProject.fulfilled, (state, action) => {
				// Al eliminar la información de 'Project', se establece el estado a 'succeeded'
				state.status = 'succeeded';
				state.projectInfo = action.payload;
				state.modified = true;
				state.id = action.payload.id;
			})
			.addCase(deleteProject.rejected, (state, action) => {
				// Si ocurre un error al eliminar la información de 'Project', se establece el estado a 'failed'
				state.status = 'failed';
				state.error = action.error.message;
				state.modified = false;
			});
	},
});

//Exportando actions
export default projectSlice.reducer;