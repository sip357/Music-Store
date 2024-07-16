'use client';

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { filterBeats } from "../actions";

export interface SelectionState {
    beats: any[], // Specify the type if you know it, e.g., string[] or Beat[]
    filteredBeats: any[] // Specify the type if you know it, e.g., string[] or Beat[]
}

const initialState: SelectionState = {
    beats: [],
    filteredBeats: []
}

export const selectionSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setBeat: (state, action: PayloadAction<any[]>) => {
            state.beats = action.payload;
        }
    }
})

export const { setBeat } = selectionSlice.actions;

export default selectionSlice.reducer;
