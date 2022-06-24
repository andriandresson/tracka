import { Container, Stack, Typography, Box } from '@mui/material';
import { FC, ReactNode } from 'react';
import { OnboardingProgress } from '../onboardingProgress';
import { Step as Steptype } from '@sendiradid-internship/tracka-ui';

interface Props {
  title: string;
  description: string;
  children: ReactNode;
  activeStep: number;
  steps: Steptype[];
}

export const OnboardingLayout: FC<Props> = ({
  title,
  description,
  children,
  activeStep,
  steps,
}) => {
  return (
    <Container>
      <Stack direction="row">
        <Box>
          <Typography variant="h2">{title}</Typography>
          <Typography variant="body1">{description}</Typography>
          {children}
        </Box>
        <OnboardingProgress steps={steps} activeStep={activeStep} />
      </Stack>
    </Container>
  );
};
