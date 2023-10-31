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
  ButtonGroup,
} from "@material-tailwind/react";

const DoctorShedule = () => {
  const doctorId = localStorage.getItem(`doctorId`);
  const jwtToken = localStorage.getItem(`jwtToken`);
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    appointmeneScheduleData();
  }, [doctorId]);

  const appointmeneScheduleData = async () => {
    console.log("This method is being called here here ");
    try {
      const response = await ApiService.upcomigAppointments(doctorId, {
        Authorization: `Bearer ${jwtToken}`,
      });

      if (response.status === 200) {
        setScheduleData(response.data);
        console.log("sheduled data here " + JSON.stringify(response.data));
      }
    } catch (error) {
      console.log("Some error occured while trying to fetch data " + error);
    }
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
                    Your Schedule list
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    See information about all schedule
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

                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Appoinments Status
                      </Typography>
                    </th>
                  </tr>
                </thead>

                {
                  <tbody>
                    {scheduleData &&
                      scheduleData.map((patientListData) => (
                        <tr key={patientListData.appointmentId}>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
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
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="p-1 bg-gray-600 h-8 text-center text-white font-bold rounded-md"
                            >
                              {`${patientListData.appointmentStatus} `}
                            </Typography>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                }
              </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4"></CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DoctorShedule;
