import { FC } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import { Step as StepType, Selection } from '@sendiradid-internship/tracka-ui';

interface Props {
  steps: StepType[];
  activeStep: number;
}

export const OnboardingProgress: FC<Props> = ({ steps, activeStep }) => {
  const { palette } = useTheme();
  const getSelectionText = (selected?: Selection | Selection[] | string[]) => {
    // Check if selected is an array
    if (Array.isArray(selected) && typeof selected[0] != 'string') {
      return selected.length > 1
        ? `${selected.length} spaces selected`
        : selected[0]?.name;
    } else if (Array.isArray(selected) && typeof selected[0] == 'string') {
      return `${selected.length} spaces selected`;
    } else if (!Array.isArray(selected)) {
      return selected?.name || '';
    } else {
      return '';
    }
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Typography variant="h3" sx={{ color: 'common.white' }}>
        Onboarding process
      </Typography>
      <Stepper
        sx={{ mt: 8, maxWidth: 200 }}
        activeStep={activeStep}
        orientation="vertical"
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              <Typography sx={{ color: '#fff' }}>{step.label}</Typography>
              {step.selected && (
                <Typography sx={{ color: palette.grey[700] }}>
                  {getSelectionText(step.selected)}
                </Typography>
              )}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
