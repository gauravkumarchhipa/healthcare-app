import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  email: string | null;
  password: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  email: null,
  password: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.isLoggedIn = true;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = null;
      state.password = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
