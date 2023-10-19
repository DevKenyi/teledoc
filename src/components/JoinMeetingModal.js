import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import ApiService from "../components/service/ApiService";
import { HttpStatusCode } from "axios";
import MeedingVideoConferencing from "./meetin_ui/MeedingVideoConferencing";
import { useNavigate } from "react-router-dom";

export function JoinMeetingModal({ toggleMeetingModal }) {
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState("");
  const jwtToken = localStorage.getItem("jwtToken");
  const doctorId = localStorage.getItem("doctorId");
  const [meetingId, setMeetingId] = useState([]);
  const [authToken, setAuthToken] = useState("");
  const [meetingStatus, setMeetingStatus] = useState(false);
  const tokenFromLocalStorage = localStorage.getItem("authToken");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch meeting details when the component is initially rendered
    fetchMeetingDetails();
  }, []); // Empty dependency array to run this effect only once

  const handleOpen = () => {
    toggleMeetingModal();
    setOpen(!open);
  };

  const fetchMeetingDetails = async () => {
    try {
      const meetingResponse = await ApiService.fetchMeetingDetails({
        Authorization: `Bearer ${jwtToken}`,
      });

      if (meetingResponse.status === HttpStatusCode.Ok) {
        setMeetingId(meetingResponse.data);
      } else {
        console.error("Failed to fetch meeting details.");
      }
    } catch (error) {
      console.error("Error fetching meeting details:", error);
    }
  };

  const handleJoinNow = async () => {
    if (!username) {
      alert("Please enter a username.");
      return;
    }

    const participantPayload = {
      name: username,
      picture: "https://i.imgur.com/test.jpg",
      preset_name: "webinar_presenter",
      custom_participant_id: "23",
    };

    if (meetingId.length > 0) {
      try {
        const addParticipantsResponse = await ApiService.addParticipants(
          doctorId,
          meetingId[0].meetingId,
          participantPayload,
          {
            Authorization: `Bearer ${jwtToken}`,
          }
        );

        if (addParticipantsResponse.status === HttpStatusCode.Created) {
          console.log(
            "User was successfully added: " + addParticipantsResponse.data
          );

          const responseText = addParticipantsResponse.data;
          const tokenStartIndex = responseText.indexOf('"token":"') + 9;
          const tokenEndIndex = responseText.indexOf('"', tokenStartIndex);
          const token = responseText.substring(tokenStartIndex, tokenEndIndex);
          setAuthToken(token);
          setMeetingStatus(true);
          localStorage.setItem("authToken", token); // Save the authToken to localStorage
        } else {
          console.error(
            "Failed to add participant. Response:",
            addParticipantsResponse.data
          );
        }
      } catch (error) {
        console.error("Error adding participants:", error);
      }
    } else {
      console.error("Meeting ID is missing.");
    }

    // Navigate to the "/video" route with authToken as a query parameter
    navigate(`/video?authToken=${tokenFromLocalStorage}`);
  };

  const handleGenerateLink = () => {
    // Implement the logic to generate a link if needed.
  };

  return (
    <>
      <Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify between">
          <DialogHeader className="flex flex-col items-start">
            <Typography className="mb-1" variant="h4">
              Join Meeting
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5 cursor-pointer"
            onClick={handleOpen}
          >
            {/* Your SVG icon here */}
          </svg>
        </div>
        <DialogBody>
          <div className="grid gap-6">
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Username
            </Typography>
            <Input
              label="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleJoinNow}>
            Join now
          </Button>
          <Button variant="gradient" color="gray" onClick={handleGenerateLink}>
            Generate Link
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
