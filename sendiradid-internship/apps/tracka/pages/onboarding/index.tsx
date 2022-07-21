import { useRouter } from 'next/router';
const OnboardingProcess = () => {
  const router = useRouter();
  router.push('/onboarding/select-team');
  return null;
};
export default OnboardingProcess;
