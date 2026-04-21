import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { PURGE } from 'redux-persist';

import { RootState } from '@/store';
import { UserInfo } from '../types/user';

import * as api from '../services/api';
import { logoutAction, setAuthToken } from '../utils/auth';
import {
  LoginRequest,
  LoginResponse,
  LogoutResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  ConfirmPasswordResetRequest,
  ConfirmPasswordResetResponse,
} from '../types/user';

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

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (): Promise<LogoutResponse> => {
    let response: LogoutResponse = { message: 'Logged out successfully' };

    try {
      response = await api.logout();
    } finally {
      await logoutAction();
    }

    return response;
  }
);

export const requestPasswordReset = createAsyncThunk(
  'user/requestPasswordReset',
  async (options: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
    return await api.resetPassword(options);
  }
);

export const confirmPasswordReset = createAsyncThunk(
  'user/confirmPasswordReset',
  async (options: ConfirmPasswordResetRequest): Promise<ConfirmPasswordResetResponse> => {
    return await api.confirmPasswordReset(options);
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

    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.userInfo = null;
      state.error = null;
    });
    builder.addCase(logoutUser.rejected, (state) => {
      state.loading = false;
      state.userInfo = null;
      state.error = null;
    });

    builder.addCase(requestPasswordReset.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(requestPasswordReset.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(requestPasswordReset.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || action.error.message || 'Failed to request password reset';
    });

    builder.addCase(confirmPasswordReset.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(confirmPasswordReset.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(confirmPasswordReset.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || action.error.message || 'Failed to confirm password reset';
    });

    builder.addCase(PURGE, () => initialState);
  },
});

export const { clearUserError, setUserInfo } = userSlice.actions;

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
