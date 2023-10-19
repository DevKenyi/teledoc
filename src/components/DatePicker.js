import React from "react";
import { Datepicker, Input, initTE } from "tw-elements";
initTE({ Datepicker, Input });
const datepickerWithFilter = document.getElementById(
  "datepicker-disabled-dates"
);
const filterFunction = (date) => {
  const isSaturday = date.getDay() === 6;
  const isSunday = date.getDay() === 0;

  return !isSaturday && !isSunday;
};

new Datepicker(datepickerWithFilter, { filter: filterFunction });

const DatePicker = () => {
  return <></>;
};

export default DatePicker;
