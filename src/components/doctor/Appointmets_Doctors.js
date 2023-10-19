import React, { useEffect, useState } from "react";
import ApiService from "../service/ApiService";
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
import { CreateMeetingModal } from "./CreateMeetingModal";
import BookAppointmentButton from "./BookAppointmentButton";

const Appointmets_Doctors = () => {
  const jwtToken = localStorage.getItem("jwtToken");
  const doctorsId = localStorage.getItem("doctorId");
  const [patientList, setPatientList] = useState(null);
  const [patientIdState, setPatientIdState] = useState(null);
  const [showCreateMeeting, setShowCreateMeeting] = useState(false);

  useEffect(() => {
    doctorsAppointments();
  }, [doctorsId]);

  const doctorsAppointments = async () => {
    try {
      const response = await ApiService.fetchAppointmentsByDoctorId(doctorsId, {
        Authorization: `Bearer ${jwtToken}`,
      });

      if (response.status === 200) {
        const responseData = response.data;

        setPatientList(responseData);

        // Assuming responseData is an array of appointments
        // const patientIds = responseData.map(
        //   (appointment) => appointment.patient.patientId
        // );

        // setPatientId(patientIds);

        // console.log("Patient IDs: ", patientIds);

        console.log(
          "All doctor appointments for debugging here " +
            JSON.stringify(responseData)
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

  const buttonText = (appointmentStatus) => {
    if (appointmentStatus === "Pending") {
      return "Schedule";
    }
    if (appointmentStatus === "Scheduled") {
      return "Go Live with patient!";
    }
    if (appointmentStatus === " InProcess") {
      return "Completed";
    }
    if (appointmentStatus === "Reschedule") {
      return "Reschedule";
    }
  };

  const handlePatientIdClick = (patientId, patientJwt) => {
    console.log(`Patient id ${patientId} clicked check for bugs `);
    console.log(`Patient jwt ${patientJwt} clicked check for bugs `);

    console.log("showCreateMeeting value:", showCreateMeeting);
  };

  return (
    <>
      <div className="m-8 p-8  w-full ">
        <div className="font-bold m-4 text-4xl   text-black">
          Doctors <span className="text-r ed-600">Appoinments</span>
        </div>
        <div className="flex lg:flex-row sm:flex-col md: flex-grow  cursor-pointer border w-full ">
          <Card className="h-full w-full p-32">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    Your Appointment list
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
                        Patiet firstname
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Patient lastname
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Date of birth
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Appoinments date & time
                      </Typography>
                    </th>
                    {/* <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Appointment time
                    </Typography>
                  </th> */}
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Appoinments Status
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
                  {patientList &&
                    patientList.map((patientListData) => (
                      <tr key={patientListData.appointmentId}>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            {/* <Avatar
                          src={`http://${appointment.doctor.profilePicture.imageUrl}`}
                          alt={`${appointment.doctor.firstname} ${appointment.doctor.lastname}`}
                          size="sm"
                        /> */}

                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {`${patientListData.patient.firstname} `}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {null}
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
                              {`${patientListData.patient.lastname} `}
                            </Typography>
                          </div>
                        </td>

                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {`${patientListData.patient.dob} `}
                          </Typography>
                        </td>
                        <td className="p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {`${patientListData.appointmentDateTime} `}
                          </Typography>
                        </td>

                        {/* <td className="p-4">
                        <Tooltip content="Edit User">
                          <IconButton variant="text" color="blue-gray">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td> */}

                        <td className="p-4">
                          <div className="w-max ">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={patientListData.appointmentStatus}
                              color={
                                patientListData.status === "Scheduled"
                                  ? "blue"
                                  : patientListData.status === "Inprocess"
                                  ? "orange"
                                  : patientListData.status === "Completed"
                                  ? "green"
                                  : patientListData.status === "Cancelled"
                                  ? "red"
                                  : patientListData.status === "Missed"
                                  ? "gray"
                                  : patientListData.status === "Rescheduled"
                                  ? "purple"
                                  : "blue-gray"
                              }
                            />
                          </div>
                        </td>

                        <td>
                          {}
                          {/* <Button
                            onClick={() =>
                              handleAppointmentBtn(
                                patientListData.patient.patientId
                              )
                            }
                            color={
                              patientListData.appointmentStatus === "Scheduled"
                                ? "blue"
                                : patientListData.appointmentStatus ===
                                  "Inprocess"
                                ? "orange"
                                : patientListData.appointmentStatus ===
                                  "Completed"
                                ? "green"
                                : patientListData.appointmentStatus ===
                                  "Pending"
                                ? "yellow"
                                : patientListData.appointmentStatus === "Missed"
                                ? "gray"
                                : patientListData.appointmentStatus ===
                                  "Rescheduled"
                                ? "purple"
                                : "pink"
                            }
                          >
                            {buttonText(patientListData.appointmentStatus)}
                          </Button> */}
                          {/* <BookAppointmentButton
                            color={
                              patientListData.appointmentStatus === "Scheduled"
                                ? "blue"
                                : patientListData.appointmentStatus ===
                                  "Inprocess"
                                ? "orange"
                                : patientListData.appointmentStatus ===
                                  "Completed"
                                ? "green"
                                : patientListData.appointmentStatus ===
                                  "Pending"
                                ? "yellow"
                                : patientListData.appointmentStatus === "Missed"
                                ? "gray"
                                : patientListData.appointmentStatus ===
                                  "Rescheduled"
                                ? "purple"
                                : "pink"
                            }
                            handleButtonOnClick={() =>
                              setShowCreateMeeting(true)
                            } // Update this line
                            btnText={buttonText(
                              patientListData.appointmentStatus
                            )}
                          /> */}

                          <CreateMeetingModal
                            handleChildOnClick={() => {
                              {
                                handlePatientIdClick(
                                  patientListData.patient.patientId,
                                  patientListData.patient.jwtToken
                                );
                              }
                            }}
                            patientJwt={patientListData.patient.jwtToken}
                            color={
                              patientListData.appointmentStatus === "Scheduled"
                                ? "blue"
                                : patientListData.appointmentStatus ===
                                  "Inprocess"
                                ? "orange"
                                : patientListData.appointmentStatus ===
                                  "Completed"
                                ? "green"
                                : patientListData.appointmentStatus ===
                                  "Pending"
                                ? "yellow"
                                : patientListData.appointmentStatus === "Missed"
                                ? "gray"
                                : patientListData.appointmentStatus ===
                                  "Rescheduled"
                                ? "purple"
                                : "pink"
                            }
                            btnText={buttonText(
                              patientListData.appointmentStatus
                            )}
                            status={patientListData.appointmentStatus}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {/* {showCreateMeeting && <CreateMeetingModal />} */}
              {/* {appointmentStatus === "Scheduled" && showCreateMeeting ? (
                <CreateMeetingModal />
              ) : (
                window.alert("You are not sheducled for an appointment")
              )} */}
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
        </div>
      </div>
    </>
  );
};

export default Appointmets_Doctors;
