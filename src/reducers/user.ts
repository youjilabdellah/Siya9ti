import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { PURGE } from 'redux-persist';

import { RootState } from '@/store';
import { UserInfo } from '../types/user';

import * as api from '../services/api';
import { setAuthToken } from '../utils/auth';
import { LoginRequest, LoginResponse } from '../types/user';

export interface UserState {
  loading: boolean;
  userInfo: UserInfo | null;
  error?: string | null;
}

const initialState: UserState = {
  loading: false,
  userInfo: null,
  error: null,
};

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (options: LoginRequest): Promise<LoginResponse> => {
      return await api.login(options);
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    clearUserError(state) {
      state.error = null;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    logoutUser(state) {
      state.userInfo = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
      setAuthToken(action.payload.token);
    });
    builder.addCase(fetchUserInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || action.error.message || 'Failed to fetch user info';
    });

    builder.addCase(PURGE, () => initialState);
  },
});

export const { clearUserError, setUserInfo, logoutUser } = userSlice.actions;

export default userSlice.reducer;

interface UserSelectorsType {
  loading: boolean | undefined;
  userInfo: UserInfo | null | undefined;
  error: string | null | undefined;
}

export const UserSelectors = (): UserSelectorsType => {
  const loading = useSelector((state: RootState) => state.user?.loading);
  const userInfo = useSelector((state: RootState) => state.user?.userInfo);
  const error = useSelector((state: RootState) => state.user?.error);

  return {
    loading,
    userInfo,
    error,
  };
};
