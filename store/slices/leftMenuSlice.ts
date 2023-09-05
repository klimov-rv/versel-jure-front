import { createSlice } from '@reduxjs/toolkit'
import {act} from "react-dom/test-utils";

interface IValue {
    CODE: string,
    ID: string,
    NAME: string,
    THEME_ICON_PATH: string
}

interface IState {
    values: IValue[],
    title: string
}

const initialState: IState  = {
    values: [],
    title: ''
}

export const leftMenuSliceReducer = createSlice({
    name: 'leftMenu',
    initialState,
    reducers: {
        setLeftMenuValues : (state, action) => {
            state.values = action.payload
        },
        setNameRubric: (state, action) => {
            state.title = action.payload
        }
    },
})

export const {
    setLeftMenuValues,
    setNameRubric
} = leftMenuSliceReducer.actions

export default leftMenuSliceReducer.reducer