import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchLoginUser, fetchRegisterUser, axiosOauth } from '../api/service';
import { User } from '../user/types/gamesItemTypes';

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
   username: 'B B',
   image: 'https://im.jigsawplanet.com/?rc=img&pid=1dbb9a88027d&size=160',
  },
  {
   email: 'a@a.com',
   password: '123456',
   token: '124',
   username: 'A A',
   image: 'https://im.jigsawplanet.com/?rc=img&pid=1dbb9a88027d&size=160',
  },
  {
   email: 'c@c.com',
   password: '123456',
   token: '125',
   username: 'C C',
   image: 'https://im.jigsawplanet.com/?rc=img&pid=1dbb9a88027d&size=160',
  },
  {
   email: 'd@d.com',
   password: '123456',
   token: '126',
   username: 'D D',
   image: 'https://im.jigsawplanet.com/?rc=img&pid=1dbb9a88027d&size=160',
  },
  {
   email: 'e@e.com',
   password: '123456',
   token: '127',
   username: 'E E',
   image: 'https://im.jigsawplanet.com/?rc=img&pid=1dbb9a88027d&size=160',
  },
  {
   email: 'f@f.com',
   password: '123456',
   token: '128',
   username: 'F F',
   image: 'https://im.jigsawplanet.com/?rc=img&pid=1dbb9a88027d&size=160',
  },
  {
   email: 'g@g.com',
   password: '123456',
   token: '129',
   username: 'G G',
   image: 'https://im.jigsawplanet.com/?rc=img&pid=1dbb9a88027d&size=160',
  },
 ],
 user: { email: '', password: '', username: '', image: '' },
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
   await fetchRegisterUser(user);
   try {
    const responseLogin = await fetchLoginUser({ login: user.email, password: user.password });
    setCookie('token', responseLogin.data.token);
    setCookie('user', JSON.stringify(user));
   } catch (err) {
    return rejectWithValue('loginFalse');
   }
  } catch (err: any) {
   if (err.response.status === 400) {
    return rejectWithValue('email');
   }
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
   user: { email: string; password: string };
   setCookie: (name: 'user' | 'token', value: string, options?: any) => void;
  },
  { rejectWithValue },
 ) => {
  try {
   const response = await fetchLoginUser({ login: user.email, password: user.password });
   setCookie('token', response.data.token);
   setCookie('user', user.email);
  } catch (err: any) {
   if (err.response.status === 400) {
    return rejectWithValue('loginPassword');
   }
   return rejectWithValue('unknownLogin');
  }
 },
);
export const oauthExist = async (
 token: string,
 setCookie: (name: 'user' | 'token', value: string, options?: any) => void,
) => {
 try {
  const { data } = await axiosOauth(token);
  setCookie('token', data.token);
  setCookie('user', data.login);
  console.log(data);
 } catch (err) {
  console.log(err);
 }
};
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
