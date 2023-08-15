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
    reducers: {},
    extraReducers: {
        [getListImages.pending]: (state) => {
            state.loading = true;
        }
        ,
        [getListImages.fulfilled]: (state, action) => {
            state.loading = false;
            state.s3mediainfo = action.payload;
        }
        ,
        [getListImages.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
        ,
        [getUrlImage.pending]: (state) => {
            state.loading = true;
        }
        ,
        [getUrlImage.fulfilled]: (state, action) => {
            state.loading = false;
            state.url = action.payload;
        }
        ,
        [getUrlImage.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
        ,
        [uploadImage.pending]: (state) => {
            state.loading = true;
        }
        ,
        [uploadImage.fulfilled]: (state, action) => {
            state.loading = false;
            state.s3mediainfo.push(action.payload);
        }
        ,
        [uploadImage.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
        ,
        [deleteImage.pending]: (state) => {
            state.loading = true;
        }
        ,
        [deleteImage.fulfilled]: (state, action) => {
            state.loading = false;
            state.s3mediainfo = state.s3mediainfo.filter((item) => item.key !== action.payload.key);
        }
        ,
        [deleteImage.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    }
});

// Exportando el reducer
export default s3MediaSlice.reducer;



