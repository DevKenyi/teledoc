import React, { useEffect, useState } from "react";
import DocIcon from "../avaters/thumbs_up_doc.png";
import CalendarIcon from "../avaters/calendar.png";
import ClockSession from "../avaters/clock_session.png";
import PendingAppointmeneIcon from "../avaters/pending.png";
import Patient from "../avaters/patient_3359183.png";
import { Chart } from "chart.js";
import GenderDemographics from "./GenderDemographics";
import NetIncomePieChart from "./NetIncomePieChart";
import ApiService from "../service/ApiService";

const DoctorDashboard = () => {
  const netIncome = 75000; // Replace with the doctor's net income

  const doctorsId = localStorage.getItem(`doctorId`);
  const jwtToken = localStorage.getItem(`jwtToken`);

  // console.log(`doctors id here ${doctorsId}`);
  // console.log(`jwt here  ${jwtToken}`);

  const [patientLength, setPatientLength] = useState(0); // Initialize patientLength to 0
  const [pendingLength, setPendingLength] = useState(0); // Initialize patientLength to 0
  const [upcomigLength, setUpcomingLength] = useState(0); // Initialize patientLength to 0
  const [inProgress, setInProgress] = useState(0); // Initialize patientLength to 0

  useEffect(() => {
    fetchData();
  }, [doctorsId]);

  useEffect(() => {
    fetchPendingAppointment();
  }, [doctorsId]);

  useEffect(() => {
    fetchUpcomingAppointments();
  }, [doctorsId]);

  const fetchData = async () => {
    try {
      const response = await ApiService.findPatientByDoctorId(doctorsId, {
        Authorization: `Bearer ${jwtToken}`,
      });

      if (response.status === 200) {
        const responseData = response.data;
        setPatientLength(responseData.length);

        console.log(responseData);
      }

      if (response.status === 302) {
        // navigate("/login");
        console.log("Token expired!");
      }
    } catch (error) {
      console.log("Error getting data", error);
    }
  };

  const fetchPendingAppointment = async () => {
    try {
      const response = await ApiService.pendingAppointments(doctorsId, {
        Authorization: `Bearer ${jwtToken}`,
      });

      if (response.status === 200) {
        const responseData = response.data;
        setPendingLength(responseData.length);

        console.log(responseData);
      }

      if (response.status === 302) {
        // navigate("/login");
        console.log("Token expired!");
      }
    } catch (error) {
      console.log("Error getting data", error);
    }
  };

  const fetchUpcomingAppointments = async () => {
    try {
      const response = await ApiService.upcomigAppointments(doctorsId, {
        Authorization: `Bearer ${jwtToken}`,
      });

      if (response.status === 200) {
        const responseData = response.data;
        setUpcomingLength(responseData.length);

        console.log(responseData);
      }

      if (response.status === 302) {
        // navigate("/login");
        console.log("Token expired!");
      }
    } catch (error) {
      console.log("Error getting data", error);
    }
  };

  const appointmentInProgress = async () => {
    try {
      const response = await ApiService.inProgress(doctorsId, {
        Authorization: `Bearer ${jwtToken}`,
      });

      if (response.status === 200) {
        const responseData = response.data;
        setInProgress(responseData.length);

        console.log(responseData);
      }

      if (response.status === 302) {
        // navigate("/login");
        console.log("Token expired!");
      }
    } catch (error) {
      console.log("Error getting data", error);
    }
  };

  return (
    <div className="m-8 p-8 ">
      <div className="font-bold m-4 text-4xl  text-black">
        Doctor's <span className="text-red-600">DASHBOARD</span>
      </div>
      <div className="flex lg:flex-row sm:flex-col md: flex-grow  cursor-pointer ">
        <div className="w-64 h-32  border shadow-md p-4 m-4 bg-orange-500 ">
          <div className="font-bold text-white">Patients</div>
          <div className="flex flex-row justify-between items-end">
            <div className="font-bold text-white text-2xl">{patientLength}</div>
            <div className="w-16 h-16 rounded-full flex">
              <img src={Patient} alt="doctIcon" />
            </div>
          </div>
          <div></div>
        </div>
        <div className="w-64 h-32  border shadow-md p-4 m-4 bg-blue-500 ">
          <div className="font-bold text-white">Upcoming Appointments</div>
          <div className="flex flex-row justify-between items-end">
            <div className="font-bold text-white  text-2xl">
              {upcomigLength}
            </div>
            <div className="w-16 h-16 rounded-full flex text-white">
              <img src={CalendarIcon} alt="calendarIcon " />
            </div>
          </div>
          <div></div>
        </div>
        <div className="w-64 h-32 text-white bg-green-200 border shadow-md p-4 m-4 ">
          <div className="font-bold">Currently in Session</div>
          <div className="flex flex-row justify-between items-end">
            <div className="font-bold text-2xl">{inProgress}</div>
            <div className="w-16 h-16 rounded-full flex">
              <img src={ClockSession} />
            </div>
          </div>
          <div></div>
        </div>
        <div className="w-64 h-32 bg-purple-300 text-white  border shadow-md p-4 m-4 ">
          <div className="font-bold"> Pending Appointments</div>
          <div className="flex flex-row justify-between items-end">
            <div className="font-bold text-2xl">{pendingLength}</div>
            <div className="w-16 h-16 rounded-full flex">
              <img src={PendingAppointmeneIcon} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-evenly space-x-8 m-10 font-bold ml-0 ">
        <div>Patients by Gender</div>
        <div>Doctors income</div>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <GenderDemographics />
        <NetIncomePieChart
          doctorName="Dr. Smith"
          income={75000}
          expenses={25000}
        />
      </div>
    </div>
  );
};

export default DoctorDashboard;
