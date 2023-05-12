import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';

const initialState = {
  message: null,
  status: 'idle',
  resetPasswordConfirm: {
    message: null,
    status: 'idle',
  },
};

export const resetPassword = createAsyncThunk(
  'passwordReset/resetPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/user/send-reset-password-email`,
        {
          email: email,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPasswordConfirm = createAsyncThunk(
  'passwordReset/resetPasswordConfirm',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/user/reset-password`, {
        token: data.token,
        password: data.password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const passwordResetSlice = createSlice({
  name: 'passwordReset',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetPassword.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.message = action.payload.message;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.status = 'failed';
      state.message = action.payload.message;
    });
    // resetPasswordConfirm
    builder.addCase(resetPasswordConfirm.pending, (state, action) => {
      state.resetPasswordConfirm.status = 'loading';
    });
    builder.addCase(resetPasswordConfirm.fulfilled, (state, action) => {
      state.resetPasswordConfirm.status = 'succeeded';
      state.resetPasswordConfirm.message = action.payload.message;
    });
    builder.addCase(resetPasswordConfirm.rejected, (state, action) => {
      state.resetPasswordConfirm.status = 'failed';
      state.resetPasswordConfirm.message = action.payload.message;
    });
  },
});

export default passwordResetSlice.reducer;
