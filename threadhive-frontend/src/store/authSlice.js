import { createSlice } from '@reduxjs/toolkit';

const getStoredToken = () => {
  const token = localStorage.getItem('token');
  return token && token !== 'undefined' && token !== 'null' ? token : null;
};

const getStoredUser = () => {
  const storedUser = localStorage.getItem('user');

  if (!storedUser || storedUser === 'undefined' || storedUser === 'null') {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

const initialState = {
  token: getStoredToken(),
  user: getStoredUser(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const { token, user } = action.payload || {};

      if (token) {
        localStorage.setItem('token', token);
        state.token = token;
      }

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        state.user = user;
      }
    },
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.token = null;
      state.user = null;
    },
    updateUser: (state, action) => {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.user = action.payload;
    },
  },
});

export const { loginUser, logout, updateUser } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
