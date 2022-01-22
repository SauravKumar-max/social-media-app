import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileState } from "../features.types";
import { getProfiles } from "./profileService";

export const getAllProfiles = createAsyncThunk(
    'profile/fetchAll', 
    async () => {
        const response = await getProfiles();
        return response?.data;
    }
)

const initialState:ProfileState = {
    status: "idle",
    errorMessage: null,
    profiles: [],
}

const profileSlice = createSlice({
    name:"profileData",
    initialState,
    reducers: {

        follow: (state, action: PayloadAction<{currentUserId: string, followingId: string}>) => {
            const { currentUserId, followingId } = action.payload;
            const currentUser = state.profiles?.find(user => user._id === currentUserId);
            const followingUser = state.profiles?.find(user => user._id === followingId);
            if(currentUser){
                currentUser.following.push(followingId);
            }
            if(followingUser){
                followingUser.followers.push(currentUserId);
            }
        },

        unFollow: (state, action: PayloadAction<{currentUserId: string, followingId: string | null}>) => {
            const { currentUserId, followingId } = action.payload;
            const currentUser = state.profiles?.find(user => user._id === currentUserId);
            const followingUser = state.profiles?.find(user => user._id === followingId);
            if(currentUser){
                currentUser.following  = currentUser.following.filter(id => id !== followingId);
            }
            if(followingUser){
                followingUser.followers = followingUser.followers.filter(id => id !== currentUserId);
            }
        },

        addPostLike:  (state, action: PayloadAction<{ postUserId: string, postId: string, userId: string }>) => {
            const user = state.profiles?.find(user => user._id === action.payload.postUserId)
            if(user){
                const userPost = user.posts?.find(post => post._id === action.payload.postId);
                if(userPost){
                    userPost.likes.count = userPost.likes.count + 1;
                    userPost.likes.likedUserId?.push(action.payload.userId)
                }
            }
        },

        removePostLike: (state, action: PayloadAction<{ postUserId: string, postId: string, userId: string }>) => {
            const user = state.profiles?.find(user => user._id === action.payload.postUserId )
            if(user){
                const userPost = user.posts?.find(post => post._id === action.payload.postId);
                if(userPost){
                    userPost.likes.count = userPost.likes.count - 1;
                    userPost.likes.likedUserId = userPost.likes.likedUserId.filter(id => id !== action.payload.userId)
                }
            }
        },

        addBookmark: (state, action) => {
            const user = state.profiles?.find(user => user._id === action.payload.userId);
            if(user){
                user.bookmarks = action.payload.newBookmark;
            }
        },

        removeBookmark: (state, action) => {
            const user = state.profiles?.find(user => user._id === action.payload.userId);
            if(user){
                user.bookmarks = user.bookmarks.filter(mark => mark._id !== action.payload.bookmarkId)
            }
        },

        addPost: (state, action) => {
            const user = state.profiles?.find(user => user._id === action.payload.userId);
            if(user){
                user.posts.push(action.payload.newPost);
            }
        },

        removePost: (state, action:PayloadAction<{ userId: string, postId: string }>) => {
            const user = state.profiles?.find(user => user._id === action.payload.userId);
            if(user){
                user.posts = user.posts.filter(post => post._id !== action.payload.postId);
            }
        },

        updateProfile: (state, action) => {
            const user = state.profiles?.find(user => user._id === action.payload.userId);
            if(user){
                user.bio = action.payload.bio;
                user.name = action.payload.name;
                user.picture.header = action.payload.headerImage;
                user.picture.profile = action.payload.profileImage;
            }
        },

    },

    extraReducers: (builder) => {
        builder
          .addCase(getAllProfiles.pending, (state) => {
            state.status = 'loading';
            state.profiles = null;
            state.errorMessage = null;
        })
          .addCase(getAllProfiles.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.profiles = action.payload?.profiles;
            state.errorMessage = null;
        })
          .addCase(getAllProfiles.rejected, (state, action) => {
            state.status = 'failed';
            state.profiles = null;
            state.errorMessage = action.error?.message || null;
        });
    },
});

export default profileSlice.reducer;

export const { 
    addPostLike, 
    removePostLike, 
    follow, 
    unFollow, 
    addBookmark, 
    removeBookmark,
    addPost,
    removePost,
    updateProfile } = profileSlice.actions;