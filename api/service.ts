import { User } from '../user/types/gamesItemTypes';

export const fetchRegisterUser = async (user: User) => {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(user),
  });
  return res;
};
export const fetchLoginUser = async (user: { login: string; password: string }) => {
  const res = await fetch('/api/auth/token', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(user),
  });

  return res;
};
