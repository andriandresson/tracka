import { useApplicationContext } from '../components/appContext';
import { useRouter } from 'next/router';
const Index = () => {
  const router = useRouter();
  const { value } = useApplicationContext();

  if (!value.isOnboard) {
    router.push('/onboarding/select-team');
  } else {
    router.push('/dashbaord');
  }

  return null;
};

export default Index;
