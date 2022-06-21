import { FC } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';


type Selection = string | string[] | undefined;

interface Step {
  label: string;
  selected?: Selection;
}

interface Props {
  steps: Step[]
  activeStep: number
}

export const OnboardingProgress: FC<Props> = ({ steps, activeStep }) => {
  const { palette } = useTheme()
  const getSelectionText = (selected: Selection) => {
    if (Array.isArray(selected)) {
      return selected.length > 1 ? `${selected.length} spaces selected` : selected[0];
    }
    return selected;
  }


  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              <Typography sx={{ color: '#fff' }}>{step.label}</Typography>
              {step.selected && <Typography sx={{ color: palette.grey[700] }}>{getSelectionText(step.selected)}</Typography>}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};