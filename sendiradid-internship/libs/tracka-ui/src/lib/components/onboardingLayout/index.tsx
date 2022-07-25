import { Typography, Button, Grid, Stack } from '@mui/material';
import { FC, ReactNode } from 'react';
import { OnboardingProgress } from '../onboardingProgress';
import {
  Step as Steptype,
  Selection,
  InformativePopup,
} from '@sendiradid-internship/tracka-ui';
import Link from 'next/link';

interface Props {
  title: string;
  description: string;
  children: ReactNode;
  activeStep: number;
  steps: Steptype[];
  setValue: (property: string, newValue: any) => void;
  clearSelection: (activeStep: number) => void;
}

export const OnboardingLayout: FC<Props> = ({
  title,
  description,
  children,
  activeStep,
  steps,
  setValue,
  clearSelection,
}) => {
  const routeList = [
    '/onboarding/select-team',
    '/onboarding/select-spaces',
    '/onboarding/map-customer-type',
    '/onboarding/select-internal-spaces',
    '/onboarding/select-internal-tasks',
    '/dashboard',
  ];
  const isSelected = (): boolean => {
    // check if selected is array of type Selection
    if (Array.isArray(steps[activeStep].selected)) {
      const teams = steps[activeStep]?.selected as Selection[];
      if (typeof teams[0] == 'string') {
        return true;
      } else {
        return teams[0]?.id !== undefined;
      }
    }
    const selectedTeam = steps[activeStep].selected as Selection;
    return selectedTeam?.id !== undefined;
  };

  return (
    <>
      <Grid item xs={12} container sx={{ minHeight: '100vh' }}>
        <InformativePopup />
        <Grid item container>
          <Grid
            item
            container
            xs={9}
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{ pt: 27, pl: 41 }}
          >
            <Typography variant="h2" sx={{ color: 'common.white', mb: 2 }}>
              {title}
            </Typography>
            <Typography variant="body1" sx={{ color: 'common.white', mb: 10 }}>
              {description}
            </Typography>
            {children}
            <Stack direction="row" sx={{ mt: 13, gap: 6 }}>
              {activeStep > 0 && (
                <Link href={routeList[activeStep - 1]} passHref>
                  <Button
                    variant="outlined"
                    sx={{
                      width: 198,
                      height: 48,
                      background: 'rgba(255, 255, 255, 0.06)',
                      color: 'common.white',
                    }}
                    onClick={() => {
                      clearSelection(activeStep);
                      setValue('activeStep', activeStep - 1);
                    }}
                  >
                    Back
                  </Button>
                </Link>
              )}
              <Link href={routeList[activeStep + 1]} passHref>
                {isSelected() ? (
                  <Button
                    variant="contained"
                    sx={{ width: 198, height: 48 }}
                    onClick={() => {
                      if (activeStep === 4) {
                        setValue('isOnboard', true);
                      } else {
                        setValue('activeStep', activeStep + 1);
                      }
                    }}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    disabled
                    variant="contained"
                    sx={{ width: 198, height: 48 }}
                    onClick={() => setValue('activeStep', activeStep + 1)}
                  >
                    Continue
                  </Button>
                )}
              </Link>
            </Stack>
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={3}
          justifyContent="center"
          sx={{
            borderLeft: 'solid 1px #278BFC',
            pt: 20,
            position: 'fixed',
            right: 0,
            minHeight: '100vh',
          }}
        >
          <OnboardingProgress steps={steps} activeStep={activeStep} />
        </Grid>
      </Grid>
    </>
  );
};
