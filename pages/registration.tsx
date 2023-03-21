import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { Auth0Provider } from '@auth0/auth0-react';

import RegistrationForm from '../user/forms/registrationForm';

const Registration = () => {
 const [cookies] = useCookies(['token', 'user']);
 const router = useRouter();
 if (cookies.token && cookies.user) {
  router.push('/profile');
 } else
  return (
   <Auth0Provider
    domain="dev-y5qq6r8ij277lgbe.us.auth0.com"
    clientId="zfM5hlo48T8ciBFDQHtMgpdpj7cQ6jyi"
    authorizationParams={{
     redirect_uri: 'http://localhost:3000/login',
     audience: 'https://dev-y5qq6r8ij277lgbe.us.auth0.com/api/v2/',
     connection: 'google-oauth2',
    }}
   >
    {' '}
    <RegistrationForm />
   </Auth0Provider>
  );
};

export default Registration;
