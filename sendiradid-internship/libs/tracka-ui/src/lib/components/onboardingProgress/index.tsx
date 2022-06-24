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
  const getSelectionText = (selected?: Selection | Selection[]) => {
    // Check if selected is an array
    if (Array.isArray(selected)) {
      return selected.length > 1
        ? `${selected.length} spaces selected`
        : selected[0]?.name;
    }
    return selected?.name || '';
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
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
