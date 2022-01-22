import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import themeReducer from "../features/theme/themeSlice";
import authReducer from "../features/auth/authSlice";
import profilesReducer from "../features/profiles/profileSlice";
import userReducer from "../features/currentUser/userSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    profiles: profilesReducer,
    currentUser: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
