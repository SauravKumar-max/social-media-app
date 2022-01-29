import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../features.types";
import { getUser } from "./userService";

export const getCurrentUser = createAsyncThunk(
    'curentUser/fetch',
    async () => {
        const response = await getUser();
        return response?.data;
    }
)

const initialState: UserState = {
    status: "idle",
    errorMessage: null,
    currentUserId: "",
    currentUserImage: "",
    addPostModal: false,
    editProfileModal: false,
    logoutModal: false,
    unfollowModal: {
        show: false,
        profileId: null
    }
}

const userSlice = createSlice({
    name: "currentUser",
    initialState,
    reducers: {
        togglePostModal: (state, action:PayloadAction<boolean>) => {
            state.addPostModal = action.payload;
        },

        toggleEditModal: (state, action:PayloadAction<boolean>) => {
            state.editProfileModal = action.payload;
        },

        toggleLogoutModal: (state, action:PayloadAction<boolean>) => {
            state.logoutModal = action.payload;
        },

        toggleUnfollwModal: (state, action:PayloadAction<{show: boolean, profileId: string | null}>) => {
            state.unfollowModal.show = action.payload.show;
            state.unfollowModal.profileId = action.payload.profileId
        },

        changeUserImage: (state, action:PayloadAction<string>) => {
            state.currentUserImage = action.payload;
        },

    },

    extraReducers: (builder) => {
        builder
          .addCase(getCurrentUser.pending, (state) => {
            state.status = 'loading';
            state.currentUserImage = "";
            state.currentUserId = "";
            state.errorMessage = null;
        })
          .addCase(getCurrentUser.fulfilled, (state, action) => {
            const { _id, picture } = action.payload?.currentUser || {};
            state.status = 'succeeded';
            state.currentUserId = _id;
            state.currentUserImage = picture?.profile;
            state.errorMessage = null;
        })
          .addCase(getCurrentUser.rejected, (state, action) => {
            state.status = 'failed';
            state.currentUserImage = "";
            state.currentUserId = "";
            state.errorMessage = action.error.message || null;
        });
    }
})

export const { togglePostModal, toggleEditModal, toggleLogoutModal, toggleUnfollwModal, changeUserImage } = userSlice.actions;

export default userSlice.reducer;