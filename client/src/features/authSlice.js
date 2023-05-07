import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import jwtDecode from 'jwt-decode';

const initialState = {
  token: null || localStorage.getItem('token'),
  message: null,
  registerStatus: 'idle',
  name: null,
  email: null,
  _id: null,
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
      return response.data;
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
      state.registerStatus = 'succeeded';
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      const decodedToken = jwtDecode(action.payload.token);
      state.name = decodedToken.name;
      state.email = decodedToken.email;
      state._id = decodedToken._id;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.registerStatus = 'failed';
      state.message = action.payload.message;
      localStorage.removeItem('token');
    });
  }, // to http requests
});

export default authSlice.reducer;
