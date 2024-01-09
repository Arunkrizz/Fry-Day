import { ProgressBarContext } from '../../../store/progressBarStore';
import { useContext } from "react";

import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Box
} from '@chakra-ui/react'

const steps = [
    {
        title: "Restaurant Information",
        description: `Restaurant name, address etc`,
        description2: 'contact no. , owner details'
    },

    {
        title: 'Restaurant Type & Timings',
         description: `Establishment & cuisine type, opening hours, etc `,
         description2: ' Menu, restaurant, food images'
          },
    { title: 'Restaurant Login Credentials', 
    description: `Set up the credentials you are going to use `,
    description2: 'to sign in to your account '
     },
]

export default function Example() {
    const { handleNext, handleBack, handleReset, activeStep, setActiveStep } = useContext(ProgressBarContext);

    return (
        <div style={{marginLeft:"30px" , marginRight:"30px"}}>
            <Stepper index={activeStep} orientation='vertical' height='400px' gap='0' w={"300px"}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                            />
                        </StepIndicator>

                        <Box flexShrink='0'>
                            <StepTitle>{step.title}</StepTitle>
                            <StepDescription >{step.description}</StepDescription>
                        </Box>

                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>
        </div>
    )
}

