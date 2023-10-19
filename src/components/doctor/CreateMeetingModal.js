import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import ApiService from "../service/ApiService";
import { HttpStatusCode } from "axios";
import { CustomSpinner } from "../SpinnerComponent";
import { DyteErrorMessage } from "../DyteErrorMessage";
import MeedingVideoConferencing from "../meetin_ui/MeedingVideoConferencing";
import { useNavigate } from "react-router-dom";

export function CreateMeetingModal({
  btnText,
  color,
  handleChildOnClick,
  patientId,
  status,
  patientJwt,
}) {
  const [open, setOpen] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingResponse, setMeetingResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [dyteErrorMessage, setDyteErrorMessage] = useState(false);
  const doctorsId = localStorage.getItem("doctorId");
  const jwtToken = localStorage.getItem("jwtToken");
  const [meetingId, setMeetingId] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [meetingStatus, setMeetingStatus] = useState(false);

  const handleOpen = () => {
    if (status !== "Scheduled") {
      alert("Patient is yet not scheduled for an appointment");
    } else {
      setOpen(true);
    }
  };

  const createMeeting = async (e) => {
    e.preventDefault();

    const newMeeting = {
      title: meetingTitle,
      preferred_region: "ap-south-1",
      record_on_start: false,
      live_stream_on_start: false,
      recording_config: {
        max_seconds: 60,
        file_name_prefix: "string",
        video_config: {
          codec: "H264",
          width: 1280,
          height: 720,
          watermark: {
            url: "http://example.com",
            size: {
              width: 1,
              height: 1,
            },
            position: "left top",
          },
        },
        audio_config: {
          codec: "AAC",
          channel: "stereo",
        },
        storage_config: {
          type: "aws",
          access_key: "string",
          secret: "string",
          bucket: "string",
          region: "us-east-1",
          path: "string",
          auth_method: "KEY",
          username: "string",
          password: "string",
          host: "string",
          port: 0,
          private_key: "string",
        },
        dyte_bucket_config: {
          enabled: true,
        },
        live_streaming_config: {
          rtmp_url: "rtmp://a.rtmp.youtube.com/live2",
        },
      },
    };

    try {
      setLoading(true);
      const response = await ApiService.createMeeting(doctorsId, newMeeting, {
        Authorization: `Bearer ${jwtToken}`,
      });

      console.log("Response from createMeeting:", response);

      if (response.status === HttpStatusCode.Created) {
        setLoading(false);

        // Extract the meeting ID from the response data
        const dataStartIndex = response.data.indexOf('{"id":"');
        const dataEndIndex = response.data.indexOf('"', dataStartIndex + 7);

        if (dataStartIndex !== -1 && dataEndIndex !== -1) {
          const meetingId = response.data.substring(
            dataStartIndex + 7,
            dataEndIndex
          );
          console.log("Meeting id:", meetingId);
          setMeetingId(meetingId); // Set the meeting ID in the state
          setMeetingStatus(true);
          window.alert("meeting has been created");
        } else {
          console.log("Failed to extract the meeting ID from the response.");
        }
      } else {
        console.log("Failed to create meeting. Response:", response.data);
        setLoading(false);
        setDyteErrorMessage(true);
      }
    } catch (error) {
      console.log("Error creating meeting:", error);
      setLoading(false);
      setDyteErrorMessage(true);
    }
  };

  const handleButtonOnClick = () => {
    handleChildOnClick(patientId);
  };

  useEffect(() => {
    console.log("Token has been updated:", authToken);
  }, [authToken]);

  useEffect(() => {
    console.log("Updated meeting status " + meetingStatus);
  }, [meetingStatus]);

  const meetingTableNavigate = useNavigate();

  return (
    <>
      <Button
        className={`bg-${color}-500 text-black`}
        onClick={() => {
          {
            handleOpen();
            handleButtonOnClick();
          }
        }}
      >
        {btnText}
      </Button>
      <Dialog open={open} handler={() => setOpen(false)}>
        <div className="flex items-center justify-between">
          <DialogHeader>Meeting Setup</DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={() => setOpen(false)}
          >
            {/* SVG path */}
          </svg>
        </div>
        <DialogBody divider>
          <div className="grid gap-6">
            <Input
              label="Title of the meeting here"
              type="text"
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
            />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="outlined" color="red" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button
            disabled={loading}
            variant="gradient"
            color="green"
            onClick={createMeeting}
          >
            {loading ? <CustomSpinner /> : btnText}
            {<DyteErrorMessage showError={dyteErrorMessage} />}
            {/* {meetingStatus && (
              <MeedingVideoConferencing authToken={authToken} />
            )} */}
            {meetingStatus && meetingTableNavigate("/meeting-details")}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
