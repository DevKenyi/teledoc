import React, { useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { HttpStatusCode } from "axios";
import ApiService from "./service/ApiService";
import PopUpModalMessage from "./PopUpModalMessage";

export default function DoctorModal({ disabled, doctorId }) {
  const [openModal, setOpenModal] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setIsLoading] = useState(false);
  const jwtToken = localStorage.getItem("jwtToken");
  const [isAppointmentBooked, setIsAppointmentBooked] = useState(false);

  const [dateTouched, setDateTouched] = useState(false);
  const [timeTouched, setTimeTouched] = useState(false);
  const [purposeTouched, setPurposeTouched] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [purposeError, setPurposeError] = useState(false);

  const handleBookAppointment = async (doctorId) => {
    console.log(
      "Appointment booked:",
      appointmentDate,
      appointmentTime,
      purpose
    );

    if (!appointmentDate) {
      setDateError(true);
      setDateTouched(true);
      return;
    }
    if (!appointmentTime) {
      setTimeError(true);
      setTimeTouched(true);
      return;
    }
    if (!purpose) {
      setPurposeError(true);
      setPurposeTouched(true);
      return;
    }

    console.log("doctor id is " + doctorId);
    try {
      setIsLoading(true);

      const appointmentDateTimeString = `${appointmentDate}T${appointmentTime}`;
      const appointmentDateTime = new Date(appointmentDateTimeString);
      const formattedDateTime = appointmentDateTime.toISOString();

      const data = {
        appointmentDateTime: formattedDateTime, //  formatted date and time
        purpose,
      };

      const response = await ApiService.bookAppointmentPost(doctorId, data, {
        Authorization: `Bearer ${jwtToken}`,
      });

      console.log("here is the users jwt " + jwtToken);
      // Process the response here
      if (response.status === HttpStatusCode.Created) {
        console.log("Appointment is booked successfully");
        setIsAppointmentBooked(true); // Set the state to indicate successful booking
      } else {
        console.log("Failed to book appointment" + response.status);
      }
    } catch (error) {
      console.log("Error booking appointment", error);
      setIsLoading(false);
    }

    setOpenModal(false);
  };

  return (
    <>
      <Button disabled={disabled} onClick={() => setOpenModal(true)}>
        Book Appointment
      </Button>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Book Appointment
            </h3>
            <div>
              <Label htmlFor="appointment-date" value="Date of Appointment" />
              <TextInput
                type="date"
                id="appointment-date"
                value={appointmentDate}
                onChange={(e) => {
                  setAppointmentDate(e.target.value);
                  setDateTouched(true);
                  setDateError(false);
                }}
                onBlur={() => setDateTouched(true)}
                required
              />
              {dateTouched && dateError && (
                <span className="text-red-500">Date is required</span>
              )}
            </div>
            <div>
              <Label htmlFor="appointment-time" value="Time of Appointment" />
              <TextInput
                type="time"
                id="appointment-time"
                value={appointmentTime}
                onChange={(e) => {
                  setAppointmentTime(e.target.value);
                  setTimeTouched(true);
                  setTimeError(false);
                }}
                onBlur={() => setTimeTouched(true)}
                required
              />
              {timeTouched && timeError && (
                <span className="text-red-500">Time is required</span>
              )}
            </div>
            <div>
              <Label
                htmlFor="appointment-purpose"
                value="Purpose of Appointment"
              />
              <TextInput
                id="appointment-purpose"
                value={purpose}
                onChange={(e) => {
                  setPurpose(e.target.value);
                  setPurposeTouched(true);
                  setPurposeError(false);
                }}
                onBlur={() => setPurposeTouched(true)}
                required
              />
              {purposeTouched && purposeError && (
                <span className="text-red-500">Purpose is required</span>
              )}
            </div>
            <div className="w-full">
              <Button
                onClick={() => handleBookAppointment(doctorId)}
                disabled={loading}
              >
                {loading ? "Booking..." : "Book Appointment"}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {isAppointmentBooked && <PopUpModalMessage setOpenModal={setOpenModal} />}
    </>
  );
}
