import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser as loginUserAction,
  logout as logoutAction,
  selectAuth,
  updateUser as updateUserAction,
} from '../store/authSlice';

export function AuthProvider({ children }) {
  return children;
}

export function useAuth() {
  const dispatch = useDispatch();
  const { token, user } = useSelector(selectAuth);

  return useMemo(
    () => ({
      token,
      user,
      loginUser: (data) => dispatch(loginUserAction(data)),
      logout: () => dispatch(logoutAction()),
      updateUser: (updatedUser) => dispatch(updateUserAction(updatedUser)),
    }),
    [dispatch, token, user],
  );
}
