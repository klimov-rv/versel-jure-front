import {configureStore} from "@reduxjs/toolkit";
import leftMenuSliceReducer from "./slices/leftMenuSlice";

export const store = configureStore({
    reducer:{
        leftMenuReducer: leftMenuSliceReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch