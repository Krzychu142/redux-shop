import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import jwtDecode from 'jwt-decode';

const initialState = {
  token: null,
  message: null,
  registerStatus: 'idle',
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    const response = await axios.post(`${baseUrl}/user/register`, {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });

    return response;
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
      console.log('fulfilled', action.payload);
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      console.log('rejected', action.payload);
    });
  }, // to http requests
});

export default authSlice.reducer;
