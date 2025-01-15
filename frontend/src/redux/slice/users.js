import { createSlice } from "@reduxjs/toolkit";

const users = createSlice({
    name: 'users',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {
        getUsersSlice: (state, action) => {
            state.list = action.payload
            return state
        },
        addUserSlice: (state, action) => {
            state.list.push(action.payload)
            return state
        },
        editUserSlice: (state, action) => {
            state.list = state.list.map(i => i.id == action.payload.id ? action.payload : i)
            return state
        },
        deleteUserSlice: (state, action) => {
            state.list = state.list.filter(i => i.id !== action.payload)
            return state
        },
        failureSlice: (state, action) => {
            state.error = action.payload
            return state
        },
        setLoader: (state, action) => {
            state.loading = action.payload
            return state
        }
    }
})
export const { getUsersSlice, addUserSlice, editUserSlice, deleteUserSlice, failureSlice, setLoader } = users.actions
export default users.reducer