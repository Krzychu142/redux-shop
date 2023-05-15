import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from './api';
import jwtDecode from 'jwt-decode';

const initialState = {
  token: null || localStorage.getItem('token'),
  message: null,
  registerStatus: 'idle',
  loginStatus: 'idle',
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

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/user/login`, {
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
  reducers: {
    loadUser(state, action) {
      if (state.token) {
        const decodedToken = jwtDecode(state.token);
        return {
          ...state,
          name: decodedToken.name,
          email: decodedToken.email,
          _id: decodedToken._id,
        };
      }
    },
    logoutUser(state, action) {
      localStorage.removeItem('token');
      return {
        token: null,
        message: null,
        registerStatus: 'idle',
        loginStatus: 'idle',
        name: null,
        email: null,
        _id: null,
      };
    },
  },
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
    builder.addCase(loginUser.pending, (state, action) => {
      state.loginStatus = 'loading';
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loginStatus = 'succeeded';
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      const decodedToken = jwtDecode(action.payload.token);
      state.name = decodedToken.name;
      state.email = decodedToken.email;
      state._id = decodedToken._id;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loginStatus = 'failed';
      state.message = action.payload.message;
      localStorage.removeItem('token');
    });
  }, // to http requests
});

export const { loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
