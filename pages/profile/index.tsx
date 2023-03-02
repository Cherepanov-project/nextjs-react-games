import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

import ProfileForm from '../../user/profile/profileForm';

const Profile = () => {
  const [cookies] = useCookies(['token', 'user']);
  const router = useRouter();
  if (!cookies.token || !cookies.user) {
    router.push('/');
  } else return <ProfileForm />;
};

export default Profile;
