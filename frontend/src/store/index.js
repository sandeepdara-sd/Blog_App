import {configureStore, createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
    name:"auth",
    initialState:{
        isLoggedIn: false,
        user: null,
        isLoading: true, 
        isInitialized: false
    },
    reducers:{
        login(state, action){
            state.isLoggedIn = true;
            state.user = action.payload || null;
            state.isLoading = false;
            state.isInitialized = true;
        },
        logout(state) {
            localStorage.removeItem("userId");
            state.isLoggedIn = false;
            state.user = null;
            state.isLoading = false;
            state.isInitialized = true;
        },
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        setInitialized(state, action) {
            state.isInitialized = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
        }
    },
})

export const authActions = authSlice.actions

export const store = configureStore({
    reducer:authSlice.reducer
})