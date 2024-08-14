'use client';

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { filterBeats, setPrice } from "../actions";

export interface SelectionState {
    price: number,
    // newBeats: any[] 
}

const initialState: SelectionState = {
    price: 10,
    // filteredBeats: []
}

export const selectionSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setPrice: (state, action: PayloadAction<number>) => {
            state.price = action.payload;
        }
    }
})

export const price = selectionSlice.actions;

export default selectionSlice.reducer;
