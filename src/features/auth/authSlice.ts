import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTokenFromLocalStroage, removeTokenFromLocalStorage } from "../../utils";
import { login } from "./authService";

export const loginUserWithCredentials = createAsyncThunk(
    'login/requestStatus', 
    async ({email, password}:{email:string, password: string}) => {
        const response = await login({email, password});
        return response?.data;
    }
)

type AuthState = {
    token: string | null,
    isAuthenticated: boolean,
    status: 'idle' | 'loading' | 'failed',
    errorMessage: string | null
}

const initialState:AuthState = {
    token: getTokenFromLocalStroage().token || null,
    isAuthenticated: getTokenFromLocalStroage().isUserLoggedIn || false,
    status: "idle",
    errorMessage: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.errorMessage = null;
            state.status = "idle";
            removeTokenFromLocalStorage();
        }
    },

    extraReducers:  {
        [loginUserWithCredentials.pending.toString()]: (state) => {
            state.token = null;
            state.isAuthenticated = true;
            state.status = "loading";
            state.errorMessage = null;
        },


       [loginUserWithCredentials.fulfilled.toString()]: (state:AuthState, action) => {
           const { token } = action.payload.login;
           state.token = token;
           state.isAuthenticated = true;
           state.errorMessage = null;
           state.status = "idle";
           localStorage.setItem("login", JSON.stringify({ isUserLoggedIn: state.isAuthenticated, token: `Bearer ${token}` }));
        },

       [loginUserWithCredentials.rejected.toString()]: (state, action) => {
            state.token = null;
            state.isAuthenticated = true;
            state.status = "failed";
            state.errorMessage = action.error.message || "";
        },
    }
});


export const { logout } = authSlice.actions;

export default authSlice.reducer;