import { createSlice } from "@reduxjs/toolkit";

export const sortsValues = {
    NEW: 'new',
    POPULAR: 'popular'
}

const initialState = {
    value: sortsValues.NEW,
    loading: 'loading',
    errors: null
}

export const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        changeValue(state, action) {
            state.value = action.payload
        }
    },

})
export const { changeValue } = sortSlice.actions
export default sortSlice.reducer;