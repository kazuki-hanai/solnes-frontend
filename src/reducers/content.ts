import { createSlice, combineReducers } from '@reduxjs/toolkit';

const ContentSlice = createSlice({
    name: 'name',
    initialState: "home",
    reducers: {
        setContentName: (state: string, action: { payload: string }): string =>
            action.payload,
    },
});

export const ContentReducer = combineReducers({
    name: ContentSlice.reducer,
});

export const { setContentName } = ContentSlice.actions;