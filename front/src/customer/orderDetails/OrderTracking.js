import { Step, StepLabel, Stepper } from "@mui/material";
import React from "react";

const steps = ["Placed", "Order Confirmed", "Shipped", "Delivered"];

const OrderTracking = ({ activeStep }) => {
  return (
    <div className="w-full">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel sx={{ color: "gray", fontSize: "44px" }}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default OrderTracking;
