import React, { useEffect, useState } from "react";
import ApiService from "./service/ApiService";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

const Appointments = () => {
  const jwtToken = localStorage.getItem("jwtToken");

  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const fetchData = async () => {
    try {
      const response = await ApiService.appointmentList({
        Authorization: `Bearer ${jwtToken}`,
      });

      if (response.status === 200) {
        const appointmentData = response.data;
        setAppointments(appointmentData);
      }

      if (response.status === 302) {
        navigate("/login");
        console.log("Token expired!");
      }
    } catch (error) {
      console.log("Error getting data", error);
    }
  };
  

  return (
    <Card className="h-full w-full p-32">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Appointment list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all appointments
            </Typography>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Doctor
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Purpose of Appointment
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Doctor's Available
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Date/Time of Appointment
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Appointment Status
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Action
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.appointmentId}>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={`http://${appointment.doctor.profilePicture.imageUrl}`}
                      alt={`${appointment.doctor.firstname} ${appointment.doctor.lastname}`}
                      size="sm"
                    />

                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {`${appointment.doctor.firstname} ${appointment.doctor.lastname}`}
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {appointment.doctor.email}
                      </Typography>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {appointment.purpose}
                    </Typography>
                  </div>
                </td>
                <td className="p-4">
                  <div className="w-max">
                    <Chip
                      variant="ghost"
                      size="sm"
                      value={
                        appointment.doctor.availability
                          ? "Available"
                          : "Not Available"
                      }
                      color={appointment.doctor.availability ? "green" : "red"}
                    />
                  </div>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {appointment.appointmentDateTime}
                  </Typography>
                </td>
                <td className="p-4">
                  <div className="w-max">
                    <Chip
                      variant="ghost"
                      size="sm"
                      value={appointment.appointmentStatus}
                      color={
                        appointment.status === "Scheduled"
                          ? "blue"
                          : appointment.status === "Inprocess"
                          ? "orange"
                          : appointment.status === "Completed"
                          ? "green"
                          : appointment.status === "Cancelled"
                          ? "red"
                          : appointment.status === "Missed"
                          ? "gray"
                          : appointment.status === "Rescheduled"
                          ? "purple"
                          : "blue-gray"
                      }
                    />
                  </div>
                </td>

                <td className="p-4">
                  <Tooltip content="Edit User">
                    <IconButton variant="text" color="blue-gray">
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        {/* <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" color="blue-gray" size="sm">
            Previous
          </Button>
          <Button variant="outlined" color="blue-gray" size="sm">
            Next
          </Button>
        </div> */}
      </CardFooter>
    </Card>
  );
};

export default Appointments;
