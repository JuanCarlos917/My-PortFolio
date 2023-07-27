import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
};

export const aboutSlice = createSlice({
    name: 'about',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        }
    }
});

export const { increment } = aboutSlice.actions;
export default aboutSlice.reducer