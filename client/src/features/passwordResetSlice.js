import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';

const initialState = {
  message: null,
  status: 'idle',
};

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
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
  },
});

export default passwordResetSlice.reducer;
