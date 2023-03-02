import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

import RegistrationForm from '../user/forms/registrationForm';

const Registration = () => {
  const [cookies] = useCookies(['token', 'user']);
  const router = useRouter();
  if (cookies.token && cookies.user) {
    router.push('/profile');
  } else return <RegistrationForm />;
};

export default Registration;
