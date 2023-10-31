import React, { useEffect, useState } from "react";

import ApiService from "./service/ApiService";
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
import { JoinMeetingModal } from "./JoinMeetingModal";

export function TableMeeting({ handleButtonToggle }) {
  const TABLE_HEAD = ["Meeting id", "Title", "Created at", "Status"];

  const jwtToken = localStorage.getItem("jwtToken");
  const doctorsId = localStorage.getItem("doctorId");

  console.log("jwt token here " + jwtToken);
  console.log("docots id here " + doctorsId);
  const [tableData, setTabledata] = useState([]);
  const [showMeetingModal, setShowMeetingModal] = useState(false);

  useEffect(() => {
    meetingResponseData();
  }, [doctorsId, jwtToken]);

  const meetingResponseData = async () => {
    try {
      const response = await ApiService.meetingByDoctorsId(doctorsId, {
        Authorization: `Bearer ${jwtToken}`,
      });

      if (response.status === 200) {
        const responseData = response.data;
        setTabledata(responseData);
      } else if (response.status === 302) {
        console.log("Token expired!");
        // You may want to handle token expiration, e.g., by redirecting the user to the login page.
      } else {
        console.log("Unexpected response status: " + response.status);
        // You can display an error message to the user here.
      }
    } catch (error) {
      console.log("Error getting data", error);
      // Handle errors or display an error message to the user.
    }
  };

  // Function to toggle the Join Meeting Modal
  const toggleMeetingModal = () => {
    setShowMeetingModal(!showMeetingModal);
  };

  return (
    <>
      <div className="">
        <div className="font-bold m-4 text-4xl text-black">
          Meeting <span className="text-red-600">Details</span>
        </div>
        <div className="flex lg:flex-row sm:flex-col md: flex-grow  cursor-pointer border w-full ">
          <Card className="h-full w-full p-32">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className="mb-2 flex items-center justify between gap-4">
                <div>
                  <Typography variant="h5" color="blue-gray">
                    Your Meeting list
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    See information about your Meeting
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
                        Meeting id
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Meeting title
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Created at
                      </Typography>
                    </th>

                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Status
                      </Typography>
                    </th>
                    <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Join
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
                  {tableData &&
                    tableData.map((data) => (
                      <tr key={data.meetingId}>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {`${data.meetingId} `}
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
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {`${data.title} `}
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
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {`${data.createdAt} `}
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
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {`${data.status} `}
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
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                <button
                                  className="bg-blue-600 w-32 h-8 text-white font-bold"
                                  onClick={toggleMeetingModal}
                                >
                                  Join now
                                </button>
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
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                <button
                                  className="bg-red-600 w-32 h-8 text-white font-bold"
                                  // onClick={toggleMeetingModal}
                                >
                                  Delete Meeting
                                </button>
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
                      </tr>
                    ))}
                </tbody>
              </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4"></CardFooter>
          </Card>
          {showMeetingModal && (
            <JoinMeetingModal toggleMeetingModal={toggleMeetingModal} />
          )}
        </div>
      </div>
    </>
  );
}
