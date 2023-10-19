import React, { useContext, useEffect, useState } from "react";
import { Typography, Button, avatar } from "@material-tailwind/react";
import { AuthContext } from "./AuthProvider";
import Charts from "./Charts";
import ApiService from "./service/ApiService";
import NotificationIcon from "./icons/noification-icon.png";
import PendingIcon from "./avaters/pending.png";

export default function Dashboard() {
  // const { userData } = useContext(AuthContext);
  const [jwtToken, setJwtToken] = useState("");
  const savedToken = localStorage.getItem("jwtToken");
  const patientId = localStorage.getItem("patientId");

  const [userData, setUserData] = useState(null);
  const [pendingAppontmentData, setPendingAppointmentData] = useState(null);
  const [scheduledAppoinmentData, setScheduledAppointmentData] = useState(null);
  const [completedAppoinmentData, setcompletedAppointmentData] = useState(null);
  const [bloodgroup, setBloogroup] = useState(null);
  const [doctorsData, setDoctorsData] = useState(null);

  // useEffect(() => {
  //   console.log("user data here for firstname here + " + userData?.firstname);
  // }, [userData]);

  useEffect(() => {
    findPatientByPatientId();
  }, [patientId]);

  useEffect(() => {
    pendingAppointmentForPatient();
  }, [patientId]);

  useEffect(() => {
    scheduledAppointmentForPatient();
  }, [patientId]);

  useEffect(() => {
    completedAppointmentForPatient();
  }, [patientId]);

  useEffect(() => {
    doctorForPatientFirstElement();
  }, [patientId]);

  const findPatientByPatientId = async () => {
    try {
      const response = await ApiService.findPatientById(patientId, {
        Authorization: `Bearer ${savedToken}`,
      });

      if (response.status === 200) {
        const responseData = response.data;

        setUserData(responseData);

        console.log("for testing purpose " + responseData);
        console.log("See data to work with " + JSON.stringify(response.data));

        if (userData && userData.firstname) {
          console.log(
            "user data here for firstname here + " + userData.firstname
          );
        }

        if (userData && userData.profilePicture.imageUrl) {
          console.log(
            "user data here for image url here here + " +
              userData.profilePicture.imageUrl
          );
        }
      }

      if (response.status === 302) {
        // navigate("/login");
        console.log("Token expired!");
      }
    } catch (error) {
      console.log(
        "Error getting data from patientById function in Dashboard",
        error
      );
    }
  };

  const pendingAppointmentForPatient = async () => {
    console.log("Pending appoinment for patient is being called here");
    try {
      const response = await ApiService.pendingAppointmentForPatient(
        patientId,
        {
          Authorization: `Bearer ${savedToken}`,
        }
      );

      if (response.status === 200) {
        const responseData = response.data;

        setPendingAppointmentData(responseData);

        console.log("pending appointment for patient" + responseData);
        console.log(
          "See pending appointment for patient here " +
            JSON.stringify(response.data)
        );
      }
      if (response.status === 302) {
        // navigate("/login");
        console.log("Token expired!");
      }
    } catch (error) {
      console.log("Error getting data", error);
    }
  };

  const scheduledAppointmentForPatient = async () => {
    console.log("Pending appoinment for patient is being called here");
    try {
      const response = await ApiService.scheduledAppointmentForPatient(
        patientId,
        {
          Authorization: `Bearer ${savedToken}`,
        }
      );

      if (response.status === 200) {
        const responseData = response.data;

        setScheduledAppointmentData(responseData);

        console.log("scheduledAppointmentForPatient" + responseData);
        console.log(
          "scheduledAppointmentForPatient " + JSON.stringify(response.data)
        );
      }
      if (response.status === 302) {
        // navigate("/login");
        console.log("Token expired!");
      }
    } catch (error) {
      console.log("Error getting data scheduledAppointmentForPatient ", error);
    }
  };

  const completedAppointmentForPatient = async () => {
    console.log("Pending appoinment for patient is being called here");
    try {
      const response = await ApiService.completedAppointmentForPatient(
        patientId,
        {
          Authorization: `Bearer ${savedToken}`,
        }
      );

      if (response.status === 200) {
        const responseData = response.data;

        setcompletedAppointmentData(responseData);

        console.log("pending appointment for patient" + responseData);
        console.log(
          "See pending appointment for patient here " +
            JSON.stringify(response.data)
        );
      }
      if (response.status === 302) {
        // navigate("/login");
        console.log("Token expired!");
      }
    } catch (error) {
      console.log("Error getting data completedAppointmentForPatient", error);
    }
  };

  const doctorForPatientFirstElement = async () => {
    console.log("doctor element for a patient");
    try {
      const response = await ApiService.doctorForPatientFirstElement(
        patientId,
        {
          Authorization: `Bearer ${savedToken}`,
        }
      );

      if (response.status === 200) {
        const responseData = response.data;

        setDoctorsData(responseData);

        console.log("doctors element for a patient" + doctorsData);
        console.log(
          "reading data for doctors image here " + JSON.stringify(doctorsData)
        );
      }
      if (response.status === 302) {
        // navigate("/login");
        console.log("Token expired!");
      }
    } catch (error) {
      console.log("Error getting data completedAppointmentForPatient", error);
    }
  };

  const greetings = "Hello";

  return (
    <>
      {userData ? (
        <div className="mx-auto lg:max-w-screen-xl">
          <div className="m-2">
            <h3 className="font-thin text-blue-400">
              Good day{" "}
              <span className="text-gray-500 font-extrabold">
                {userData.firstname} <span>{userData.lastname}</span>
              </span>
            </h3>
            <p className="text-gray-500  font-semibold">
              How are you doing today ?
            </p>
          </div>
          <div className="flex flex-col sm:flex-col md:flex-row lg:flex-row gap-4">
            {doctorsData ? (
              <div className="bg-gray-200 h-48 rounded-md shadow-md flex-grow mb-4 md:mb-0 lg:mr-4">
                <h2 className="m-4 font-bold text-gray-600 font-sans text-md">
                  Your Doctors
                </h2>

                <div className="flex flex-col">
                  {doctorsData.map((doctor, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <img
                        src={
                          doctor.profilePicture
                            ? doctor.profilePicture.imageUrl
                            : "Loading"
                        }
                        alt={`Doctor ${index + 1}'s image`}
                        className="w-16 h-16 rounded-full bg-cyan-400 m-4"
                      />
                      <div className="flex flex-col border-l-4 p-2 border-pink-500">
                        <p className="mb-0 font-bold font-sans ">
                          {" "}
                          <span className="text-gray-700">Dr.</span>
                          {doctor.firstname ? doctor.firstname : "Loading"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>Loading data</div>
            )}

            <div className="bg-gray-200 h-48 rounded-md shadow-md flex-grow mb-4 md:mb-0 lg:mr-4">
              <h2 className="m-4 font-bold text-gray-600 font-sans text-md ">
                Your <span className="text-red-500 font-bold">Health</span> data
              </h2>
              <div className="m-4 p-2 font-bold">
                <div className="p-2 border border-l-8 border-red-900 rounded flex flex-row justify-between ">
                  Blood Group:{" "}
                  <span className="w-8 h-8 rounded-full bg-red-900 text-white flex items-center justify-center font-extrabold text-sm">
                    {userData.bloodGroup}
                  </span>
                </div>
                <div className="p-2 border border-l-8 border-yellow-900 rounded flex flex-row justify-between ">
                  Genotype:{" "}
                  <span className="w-8 h-8 rounded-full bg-yellow-900 text-white flex items-center justify-center font-extrabold text-sm">
                    {userData.genotype}
                  </span>
                </div>

                <div className="p-2 border border-l-8 border-green-900 rounded flex flex-row justify-between ">
                  Weight:{" "}
                  <span className="w-8 h-8 rounded-full bg-green-900 text-white text-center font-extrabold">
                    {null}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-200 h-48 rounded-md shadow-md flex-grow mb-4 md:mb-0 lg:mr-4">
              <h2 className="m-4 font-bold text-gray-600 font-sans text-md ">
                Your{" "}
                <span className="text-red-500 font-bold">appointments</span>{" "}
                data
              </h2>
              <div className="m-4 p-2 font-bold">
                <div className="p-2 border border-l-8 border-red-900 rounded flex flex-row justify-between ">
                  Pending Appointment:{" "}
                  <span className="w-6 h-6 rounded-full bg-red-900 text-white text-center font-extrabold">
                    {pendingAppontmentData}
                  </span>
                </div>
                <div className="p-2 border border-l-8 border-yellow-900 rounded flex flex-row justify-between ">
                  Schedulled Appointment:{" "}
                  <span className="w-6 h-6 rounded-full bg-yellow-900 text-white text-center font-extrabold">
                    {scheduledAppoinmentData}
                  </span>
                </div>

                <div className="p-2 border border-l-8 border-green-900 rounded flex flex-row justify-between ">
                  Confirmed Appointment:{" "}
                  <span className="w-6 h-6 rounded-full bg-green-900 text-white text-center font-extrabold">
                    {completedAppoinmentData}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2"></div>
          <div className="m-4">
            <Charts />
          </div>
        </div>
      ) : (
        // Placeholder or loading message while userData is null
        <Typography color="red" className="text-center font-bold">
          Loading user data...
        </Typography>
      )}
    </>
  );
}
