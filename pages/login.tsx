import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

import LoginForm from '../user/forms/loginForm';

const Login = () => {
  const [cookies] = useCookies(['token', 'user']);
  const router = useRouter();
  if (cookies.token && cookies.user) {
    router.push('/profile');
  } else return <LoginForm />;
};

export default Login;
