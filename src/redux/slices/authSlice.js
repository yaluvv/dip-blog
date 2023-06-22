import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "../../services/auth.service";

export const authLogin = createAsyncThunk('auth/authLogin', async (payload) => {
    const data = await authService.login(payload)
    return data
})

export const authSignup = createAsyncThunk('auth/authSignup', async (payload) => {
    const data = await authService.signup(payload)
    return data
})

export const authMe = createAsyncThunk('auth/me', async () => {
    const data = await authService.me()
    return data
})

const initialState = {
    user: null,
    loading: 'loading',
    errors: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(authLogin.pending, (state) => {
            state.user = null
            state.loading = 'loading'
        }).addCase(authLogin.fulfilled, (state, action) => {
            state.loading = 'loaded'
            state.user = action.payload
        }).addCase(authLogin.rejected, (state, action) => {
            state.loading = 'rejected'
            state.user = null
            state.errors = action.payload
        })

            // signup
            .addCase(authSignup.pending, (state) => {
                state.user = null
                state.loading = 'loading'
            }).addCase(authSignup.fulfilled, (state, action) => {
                state.loading = 'loaded'
                state.user = action.payload
            }).addCase(authSignup.rejected, (state, action) => {
                state.loading = 'rejected'
                state.user = null
                state.errors = action.payload
            })

            // me
            .addCase(authMe.pending, (state) => {
                state.user = null
                state.loading = 'loading'
            }).addCase(authMe.fulfilled, (state, action) => {
                state.loading = 'loaded'
                state.user = action.payload
            }).addCase(authMe.rejected, (state, action) => {
                state.loading = 'rejected'
                state.user = null
                state.errors = action.payload
            })
    }
})
export const { logout } = authSlice.actions
export default authSlice.reducer;