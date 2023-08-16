import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Accediendo a la variable de entorno
const baseURL = import.meta.env.VITE_BASE_URL;

// Creando la acción asíncrona para obtener las imagenes de "AWS S3"
export const getListImages = createAsyncThunk('s3Media/list', async () => {
    try {
		const response = await axios.get(`${baseURL}/s3Media/list`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
});

export const getUrlImage = createAsyncThunk(
    's3Media/generateUrl',
    async (key) => {
        try {
            const response = await axios.get(`${baseURL}/s3Media/generate-url/${key}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const uploadImage = createAsyncThunk('s3Media/upload', async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post(
            `${baseURL}/s3Media/`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
});

export const deleteImage = createAsyncThunk(
    's3Media/deleteFile',
    async (key) => {
        try {
            const response = await axios.delete(`${baseURL}/s3Media/delete-file/${key}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
);

// Creando el slice para las imagenes de "AWS S3"
const s3MediaSlice = createSlice({
    name: 's3Media',
    initialState: {
        s3mediaInfo: [],
        url: '',
        loading: false,
        error: null,
    },
    reducers: {
        clearUrl: (state) => {
            state.url = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getListImages.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getListImages.fulfilled, (state, action) => {
            state.loading = false;
            state.s3mediaInfo = action.payload;
        });
        builder.addCase(getListImages.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(getUrlImage.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUrlImage.fulfilled, (state, action) => {
            state.loading = false;
            state.url = action.payload;
        });
        builder.addCase(getUrlImage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(uploadImage.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(uploadImage.fulfilled, (state, action) => {
			state.loading = false;
			state.s3mediaInfo.push(action.payload);
			state.loading = false;
		});
        builder.addCase(uploadImage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(deleteImage.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteImage.fulfilled, (state, action) => {
            state.loading = false;
            state.s3mediaInfo = state.s3mediaInfo.filter((item) => item.key !== action.payload.key);
        });
        builder.addCase(deleteImage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

// Exportando las acciones generadas
export const { clearUrl } = s3MediaSlice.actions;

// Exportando el reducer
export default s3MediaSlice.reducer;


