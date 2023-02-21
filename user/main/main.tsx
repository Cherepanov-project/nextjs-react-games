/* eslint-disable react/no-children-prop */
import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useAppDispatch } from '../../hooks';
import { loginUser } from '../../store/userSlice';

import { DivForm, H1, InputBtn, P, Section } from './mainStyle';

const Main = () => {
  const [cookies, setCookie] = useCookies(['token', 'user']);
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (cookies.user) {
      const { user } = cookies;
      dispatch(loginUser({ user, setCookie })).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          router.push('/profile');
        }
      });
    }
  }, []);
  return (
    <Section>
      <DivForm>
        <H1>Welcome</H1>
        <P>
          <Link href="/login">
            <InputBtn type="button" children="login" />
          </Link>
          <Link href="/registration">
            <InputBtn type="button" children="sign-Up" />
          </Link>
        </P>
      </DivForm>
    </Section>
  );
};

export { Main };
