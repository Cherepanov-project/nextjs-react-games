/* eslint-disable react/no-children-prop */
import React from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { DivForm, H1, InputBtn, P, Section } from './mainStyle';

const Main = () => {
 const [cookies] = useCookies(['token', 'user']);
 const router = useRouter();
 if (cookies.token && cookies.user) {
  router.push('/profile');
 } else
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
