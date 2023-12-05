import React, { createContext, useState, useContext } from "react";

export const ProgressBarContext = createContext(null);

function progressBarStore({ children }) {
  const [postDetails, setPostDetails] = useState([]);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {    
    console.log(activeStep,"activestep")
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  return (
    <ProgressBarContext.Provider  value={{ postDetails, setPostDetails, activeStep, handleNext, handleBack, handleReset }}>
      {children}
    </ProgressBarContext.Provider>
  );
}

export default progressBarStore;
