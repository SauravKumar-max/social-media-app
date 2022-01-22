import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getThemeFromLocalStorage } from "../../utils/index";

export type themeState = {
    theme: "light" | "dark";
}

const initialState:themeState = {
    theme: getThemeFromLocalStorage(),
}

const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        lightTheme: (state:themeState) => {
            state.theme = "light"
        },

        darkTheme: (state: themeState) => {
            state.theme = "dark"
        },
    },
});

export const selectTheme = (state: RootState) => state.theme;

export const { lightTheme, darkTheme } = themeSlice.actions;

export default themeSlice.reducer;