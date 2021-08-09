import { combineReducers } from '@reduxjs/toolkit';
import { ContentReducer } from './content';

export const rootReducer = combineReducers({
    contentState: ContentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;