import React, { useState } from "react";
import { Form, Checkbox, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import ApiService from "../service/ApiService";
import { HttpStatusCode } from "axios";

import "semantic-ui-css/semantic.min.css";

export default function Registration() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dob, setDob] = useState("");
  const [qualification, setQualification] = useState("");

  const navigate = useNavigate();

  const handleDateChange = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setDob(formattedDate);
  };

  const validateFields = () => {
    if (
      firstname.trim() === "" ||
      lastname.trim() === "" ||
      phoneNumber.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === "" ||
      dob === null
    ) {
      setError("Some fields are missing input.");
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    if (!validateEmail()) {
      return;
    }

    if (!terms) {
      setError("Please accept the Terms and Conditions.");
      return;
    }

    try {
      setIsLoading(true);
      const formData = {
        firstname,
        lastname,
        phoneNumber,
        email,
        password,
        confirmPassword,
        dob,
        terms,
      };
      const response = await ApiService.doctorRegPost(formData);
      if (response.status === HttpStatusCode.Created) {
        navigate("/login");
        const data = response.data;
        console.log(data);
      } else {
        setError("Server Error. Please try again later.");
      }
    } catch (error) {
      console.log(`Error occurred while posting data to the server: ${error}`);
      setError("Server Error. Please try again later.");
    } finally {
      setIsLoading(false);
      resetFormFields();
    }
  };

  const resetFormFields = () => {
    setFirstname("");
    setLastname("");
    setPhoneNumber("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setTerms(false);
    setError("");
    setDob("");
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-center text-2xl font-bold mb-8">
            Doctor Onboarding
          </h2>
          <Form className="space-y-4" onSubmit={handleSubmit}>
            <Form.Input
              placeholder="Firstname"
              id="firstname"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <Form.Input
              placeholder="Lastname"
              id="lastname"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <Form.Input
              placeholder="Phone number"
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Form.Input
              placeholder="email"
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Input
              placeholder="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Input
              placeholder="Confirm Password"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div>
              <DatePicker
                className="w-full"
                label="Date of birth"
                value={dob}
                onChange={(date) => handleDateChange(date)}
              />
            </div>
            <Form.Field>
              <Checkbox
                className="mt-8"
                label="I agree to the Terms and Conditions"
                checked={terms}
                onChange={(e, { checked }) => setTerms(checked)}
              />
            </Form.Field>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" color="blue" fluid disabled={isLoading}>
              {isLoading ? "Loading..." : "Register"}
            </Button>
          </Form>
          <p className="text-center text-sm mt-4">
            Already registered?{" "}
            <a
              href="/login"
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </LocalizationProvider>
  );
}
