import axios from 'axios';

import { User } from '../user/types/gamesItemTypes';

const instance = axios.create({
 headers: {
  accept: 'application/json',
  'Content-Type': 'application/json;charset=utf-8',
 },
});

export const fetchRegisterUser = async (user: User) => {
 const res = await instance.post('/api/auth/register', {
  email: user.email,
  nickname: user.username,
  password: user.password,
 });
 return res;
};
export const fetchLoginUser = async (user: { login: string; password: string }) => {
 const res = await instance.post('/api/auth/token', { user });
 return res;
};
export const axiosOauth = async (token: string) => {
 const res = await instance.post(
  'http://91.241.64.78:8088/api/auth/oauth2',
  JSON.stringify({ token, connection: 'google' }),
 );
 return res;
};
