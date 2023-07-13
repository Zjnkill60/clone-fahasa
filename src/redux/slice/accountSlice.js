import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    info: {
        email: "",
        name: "",
        role: "",
        avatar: ""

    }
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        handleDispatchLogin: (state, action) => {
            console.log(action.payload)
            state.isAuthenticated = true
            state.info = action.payload


        },
        handleDispatchLogout: (state) => {

            state.isAuthenticated = false
            state.info = {}


        },

    },
})

// Action creators are generated for each case reducer function
export const { handleDispatchLogin, handleDispatchLogout } = accountSlice.actions

export default accountSlice.reducer