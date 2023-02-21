import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchLoginUser, fetchRegisterUser } from '../api/service';
import { User } from '../user/types/gamesItemTypes';

// import {fetchLoginUser, registerUser} from '../../api/service';

export interface ReducerInitialState {
  users: User[];
  user: User;
  loading: boolean;
  error: string;
}

const initialState: ReducerInitialState = {
  users: [
    {
      email: 'b@b.com',
      password: '123',
      token: '123',
      nickname: 'B B',
      image: 'https://im.jigsawplanet.com/?rc=img&pid=1dbb9a88027d&size=160',
    },
    {
      email: 'a@a.com',
      password: '123456',
      token: '124',
      nickname: 'A A',
      image: 'https://im.jigsawplanet.com/?rc=img&pid=1dbb9a88027d&size=160',
    },
    {
      email: 'c@c.com',
      password: '123456',
      token: '125',
      nickname: 'C C',
      image: 'https://im.jigsawplanet.com/?rc=img&pid=1dbb9a88027d&size=160',
    },
    {
      email: 'd@d.com',
      password: '123456',
      token: '126',
      nickname: 'D D',
      image: 'https://im.jigsawplanet.com/?rc=img&pid=1dbb9a88027d&size=160',
    },
    {
      email: 'e@e.com',
      password: '123456',
      token: '127',
      nickname: 'E E',
      image: 'https://im.jigsawplanet.com/?rc=img&pid=1dbb9a88027d&size=160',
    },
    {
      email: 'f@f.com',
      password: '123456',
      token: '128',
      nickname: 'F F',
      image: 'https://im.jigsawplanet.com/?rc=img&pid=1dbb9a88027d&size=160',
    },
    {
      email: 'g@g.com',
      password: '123456',
      token: '129',
      nickname: 'G G',
      image: 'https://im.jigsawplanet.com/?rc=img&pid=1dbb9a88027d&size=160',
    },
  ],
  user: { email: '', password: '', nickname: '', image: '' },
  loading: false,
  error: '',
};

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (
    {
      user,
      setCookie,
    }: {
      user: User;
      setCookie: (name: 'user' | 'token', value: string, options?: any) => void;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetchRegisterUser(user);
      if (response.status === 400) {
        return rejectWithValue('email');
      }
      if (!response.ok) {
        throw Error;
      }
      const responseLogin = await fetchLoginUser({ login: user.email, password: user.password });
      if (!responseLogin.ok) {
        return rejectWithValue('loginFalse');
      }
      const body = await responseLogin.json();
      setCookie('token', body.token);
      setCookie('user', JSON.stringify(user));
    } catch (e) {
      return rejectWithValue('unknown');
    }
  },
);

export const loginUser = createAsyncThunk(
  'users/loginUser',
  async (
    {
      user,
      setCookie,
    }: {
      user: User;
      setCookie: (name: 'user' | 'token', value: string, options?: any) => void;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetchLoginUser({ login: user.email, password: user.password });
      if (response.status === 400) {
        return rejectWithValue('loginPassword');
      }
      if (!response.ok) {
        throw Error;
      }
      const body = await response.json();
      setCookie('token', body.token);
      setCookie('user', JSON.stringify(user));
    } catch (e) {
      return rejectWithValue('unknownLogin');
    }
  },
);
export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateList(state, action: PayloadAction<User[]>) {
      state.users = state.users.concat(action.payload);
    },
    currentUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action.payload);
    });
    builder.addCase(loginUser.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = String(action.payload);
    });
  },
});

export const { updateList, currentUser } = userSlice.actions;

export default userSlice.reducer;
