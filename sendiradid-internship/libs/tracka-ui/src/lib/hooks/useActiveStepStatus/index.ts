import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useActiveStepStatus = (setValue: any) => {
  const router = useRouter();
  useEffect(() => {
    if (router.pathname === '/onboarding/select-team') {
      setValue('activeStep', 0);
    } else if (router.pathname === '/onboarding/select-spaces') {
      setValue('activeStep', 1);
    } else if (router.pathname === '/onboarding/map-customer-type') {
      setValue('activeStep', 2);
    } else if (router.pathname === '/onboarding/select-internal-spaces') {
      setValue('activeStep', 3);
    } else if (router.pathname === '/onboarding/select-internal-tasks') {
      setValue('activeStep', 4);
    }
  }, [router.pathname]);
  return null;
};
