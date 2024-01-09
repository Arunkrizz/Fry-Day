import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import  { ProgressBarContext } from '../../../store/progressBarStore'; 
import { useContext } from "react";


const steps = [
  {
    label: "Restaurant Information",
    description: `Restaurant name, address,
    contact no., owner details`,
  },
  {
    label: 'Restaurant Type & Timings',
    description:
      `Establishment & cuisine type, opening hours Menu, restaurant,
       food images`,
  },
  {
    label: 'Restaurant Login Credentials',
    description:
      `Set up the credentials you are going to use to sign in to your account `,
  },
 
];

export default function VerticalLinearStepper() {
  const { handleNext,handleBack,handleReset,activeStep,setActiveStep } = useContext(ProgressBarContext);
  

  return (
    <Box sx={{ maxWidth: 250 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          
          <Step key={step.label}>
            
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
             <h4>{step.label}</h4 > 
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
               
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}