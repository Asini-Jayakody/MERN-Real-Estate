import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    loading: false,
    error: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true
        },
        signInSuccess: (state,action) => {
            state.currentUser = action.payload,
            state.error = null,
            state.loading = false
        },
        signInFaliure: (state, action) => {
            state.error = action.payload,
            state.loading = false
        }
    }
})

export const {signInStart, signInSuccess, signInFaliure} = userSlice.actions

export default userSlice.reducer