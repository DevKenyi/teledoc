import { Button } from "@material-tailwind/react";
import React from "react";

const BookAppointmentButton = ({
  btnText,
  handleButtonOnClick,
  patientId,
  color,
}) => {
  const handleButtonOnClicked = () => {
    handleButtonOnClick(patientId);
  };
  return (
    <Button onClick={() => handleButtonOnClicked(patientId)} color={color}>
      {btnText}
    </Button>
  );
};

export default BookAppointmentButton;
