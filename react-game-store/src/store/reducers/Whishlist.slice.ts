import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IGame } from "src/types/IGame";

interface WhishlistState {
    whishlist: IGame[]
}

const initialState:WhishlistState = {
    whishlist: []
}

const whishlistSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToWhishlist: (state, action: PayloadAction<IGame>) => {
            state.whishlist.push(action.payload)
        },
        removeFromWhishlist: (state, action: PayloadAction<number>) => {
            state.whishlist = state.whishlist.filter((item) => item.id != action.payload)
        }
    }
})

export const {
    addToWhishlist,
    removeFromWhishlist
} = whishlistSlice.actions;

export const whishlistReducer = whishlistSlice.reducer;