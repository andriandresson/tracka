import { Container, Stack, Typography, Box, Button } from '@mui/material';
import { FC, ReactNode } from 'react';
import { OnboardingProgress } from '../onboardingProgress';
import { Step as Steptype, Selection } from '@sendiradid-internship/tracka-ui';
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
    '/onboarding/review',
  ];

  console.log(steps[activeStep]);

  const isSelected = (): boolean => {
    // check if selected is array of type Selection
    if (Array.isArray(steps[activeStep].selected)) {
      const teams = steps[activeStep]?.selected as Selection[];
      return teams[0]?.id !== undefined;
    }
    const selectedTeam = steps[activeStep].selected as Selection;
    return selectedTeam?.id !== undefined;
  };

  console.log(steps);
  return (
    <Container>
      <Stack direction="row">
        <Box>
          <Typography variant="h2">{title}</Typography>
          <Typography variant="body1">{description}</Typography>
          {children}
          {activeStep > 0 && (
            <Link href={routeList[activeStep - 1]} passHref>
              <Button
                variant="outlined"
                sx={{ mt: 8, width: 200, alignSelf: 'flex-end' }}
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
                sx={{ mt: 8, width: 200, alignSelf: 'flex-end' }}
                onClick={() => setValue('activeStep', activeStep + 1)}
              >
                Continue
              </Button>
            ) : (
              <Button
                disabled
                variant="contained"
                sx={{ mt: 8, width: 200, alignSelf: 'flex-end' }}
                onClick={() => setValue('activeStep', activeStep + 1)}
              >
                Continue
              </Button>
            )}
          </Link>
        </Box>
        <OnboardingProgress steps={steps} activeStep={activeStep} />
      </Stack>
    </Container>
  );
};
