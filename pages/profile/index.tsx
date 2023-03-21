import { Auth0Provider } from '@auth0/auth0-react';

import ProfileForm from '../../user/profile/profileForm';

const Profile = () => (
 <Auth0Provider
  domain="dev-y5qq6r8ij277lgbe.us.auth0.com"
  clientId="zfM5hlo48T8ciBFDQHtMgpdpj7cQ6jyi"
  authorizationParams={{
   redirect_uri: 'http://localhost:3000/login',
   audience: 'https://dev-y5qq6r8ij277lgbe.us.auth0.com/api/v2/',
   connection: 'google-oauth2',
  }}
 >
  <ProfileForm />{' '}
 </Auth0Provider>
);

export default Profile;
