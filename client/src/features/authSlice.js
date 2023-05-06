import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import jwtDecode from 'jwt-decode';

const initialState = {
  response: null,
  registerStatus: 'idle',
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/user/register`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      });

      return response.data.token;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.registerStatus = 'loading';
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.response = action.payload;
        state.registerStatus = 'succeeded';
      } else {
        state.response = action.payload;
        state.registerStatus = 'failed';
      }
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.response = action.payload;
      state.registerStatus = 'failed';
    });
  }, // to http requests
});

export default authSlice.reducer;
