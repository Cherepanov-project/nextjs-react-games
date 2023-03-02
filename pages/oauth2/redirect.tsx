import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

const OAuth2RedirectHandler = () => {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies(['token', 'user']);

  if (router.query?.token) {
    const { email, token } = router.query;
    setCookie('user', email);
    setCookie('token', token);
    router.push('/profile');
  } else {
    router.push('/');
  }
};

export default OAuth2RedirectHandler;
