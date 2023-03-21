/* eslint-disable react/no-children-prop */
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { useAuth0 } from '@auth0/auth0-react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import google from '../img/google.svg';
import facebook from '../img/facebook.svg';
import twitter from '../img/twitter.svg';
import { registerUser, oauthExist } from '../../store/userSlice';
import { User } from '../types/gamesItemTypes';

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

type Inputs = {
 username: string;
 email: string;
 password: string;
 password_repeat: string;
};

const RegistrationForm = () => {
 const {
  register,
  handleSubmit,
  formState: { errors },
  clearErrors,
 } = useForm<Inputs>();
 const [, setCookie] = useCookies(['token', 'user']);

 const { loginWithRedirect, isAuthenticated, getAccessTokenSilently } = useAuth0();
 if (isAuthenticated) {
  getAccessTokenSilently().then((token) => {
   oauthExist(token, setCookie);
  });
 }
 const dispatch = useAppDispatch();

 const router = useRouter();

 const { error, loading } = useAppSelector((state) => state.user);

 const onSubmit: SubmitHandler<Inputs> = async (date: Inputs) => {
  const user: User = {
   image: '',
   username: date.username,
   email: date.email,
   password: date.password,
  };

  const isAuth = await dispatch(registerUser({ user, setCookie }));
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
    {error === 'loginFalse' && (
     <PError>
      Регистрация прошла успешно, но со входом на сайт что-то пошло не так. Попробуйте позже или
      обратитесь в поддержку
     </PError>
    )}
    <Input
     placeholder="Username"
     {...register('username', {
      required: 'Required field',
      minLength: {
       value: 3,
       message: 'At least 3 characters',
      },
      maxLength: {
       value: 20,
       message: 'Maximum 20 character',
      },
     })}
    />
    {errors?.username && <PError>{errors.username.message}</PError>}
    <Input
     placeholder="Some@example.com"
     {...register('email', {
      required: 'Required field',
      pattern: {
       value: /^\S+@\S+\.\S+$/,
       message: 'Type valid email',
      },
     })}
    />
    {errors?.email && <PError>{errors.email.message}</PError>}
    {!errors?.email && error === 'email' && <PError>Данный Email уже занят</PError>}
    <Input
     type="password"
     placeholder="Password"
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
    {error === 'unknown' && <PError>При регистрации что-то пошло не так попробуйте позже</PError>}
    <InputBtn type="submit" children="Create" disabled={loading} />
    <P>
     Already have an account?{' '}
     <Link href="/login">
      <a>Sign In.</a>
     </Link>
    </P>
   </Form>
  </Section>
 );
};

export default RegistrationForm;
