/* eslint-disable react/no-children-prop */
import { SubmitHandler, useForm } from 'react-hook-form';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useAuth0 } from '@auth0/auth0-react';

import facebook from '../img/facebook.svg';
import google from '../img/google.svg';
import twitter from '../img/twitter.svg';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { loginUser, oauthExist } from '../../store/userSlice';

import {
 DivImgLogo,
 Form,
 H4,
 ImgLogo,
 Input,
 InputBtn,
 P,
 PError,
 Section,
 Span,
} from './loginFormStyle';

export type Inputs = {
 email: string;
 username: string;
 password: string;
};

const LoginForm = () => {
 const { error, loading } = useAppSelector((state) => state.user);
 const [, setCookie] = useCookies(['token', 'user']);
 const router = useRouter();
 const dispatch = useAppDispatch();
 const { loginWithRedirect, isAuthenticated, getAccessTokenSilently } = useAuth0();
 if (isAuthenticated) {
  getAccessTokenSilently().then((token) => {
   oauthExist(token, setCookie);
  });
 }

 const {
  register,
  handleSubmit,
  formState: { errors },
  clearErrors,
 } = useForm<Inputs>();

 const onSubmit: SubmitHandler<Inputs> = async (date) => {
  const user = {
   email: date.username,
   password: date.password,
  };
  const isAuth = await dispatch(loginUser({ user, setCookie }));
  if (isAuth.meta.requestStatus === 'fulfilled') {
   clearErrors();
   router.push('/profile');
  }
 };

 return (
  <Section>
   <Form onSubmit={handleSubmit(onSubmit)}>
    <DivImgLogo>
     <a onClick={() => loginWithRedirect()}>
      <ImgLogo src={google.src} alt="google" />
     </a>
     <a href="https://www.facebook.com">
      <ImgLogo src={facebook.src} alt="facebook" />
     </a>
     <a href="https://www.twitter.com">
      <ImgLogo src={twitter.src} alt="twitter" />
     </a>
    </DivImgLogo>
    <H4>
     <Span>or with Email</Span>
    </H4>
    <Input
     placeholder="User email"
     {...register('username', {
      required: 'Required field',
      pattern: {
       value: /^\S+@\S+\.\S+$/,
       message: 'Type valid email',
      },
     })}
    />
    {errors?.username && <PError>{errors.username.message}</PError>}
    <Input
     placeholder="Password"
     type="password"
     {...register('password', {
      required: 'You must specify a password',
      minLength: {
       value: 6,
       message: 'Password must have at least 6 characters',
      },
      maxLength: {
       value: 40,
       message: 'Password must have maximum 40 characters',
      },
     })}
    />
    {errors.password && <PError>{errors.password.message}</PError>}

    {!errors.password && error === 'loginPassword' && (
     <PError>Пароль или email введены не верно</PError>
    )}

    <InputBtn type="submit" children="Log in" disabled={loading} />
    <P>
     Don`t have an account?
     <Link href="/registration">
      <a style={{ color: '#F46119' }}>Sign Up</a>
     </Link>
    </P>
   </Form>
  </Section>
 );
};

export default LoginForm;
