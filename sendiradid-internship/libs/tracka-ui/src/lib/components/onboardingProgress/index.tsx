import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = [
  {
    label: 'Select team',
    description: ['sendiradid'],
  },
  {
    label: 'Select space',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Map customer type',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
  {
    label: 'Review',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

// interface Props {
//     label: string;
//     description: string;
// }

export const OnboardingProgress = () => {
  const [activeStep, setActiveStep] = useState(0);
 
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ color: '#fff' }}>{step.description}</Typography>
              <Box>
                <div>
                  <Button onClick={handleNext}>
                    {index === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>

                  <Button onClick={handleBack}>Back</Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Typography sx={{ color: '#fff' }}>All steps are completed.</Typography>
      )}
    </Box>
  );
};
