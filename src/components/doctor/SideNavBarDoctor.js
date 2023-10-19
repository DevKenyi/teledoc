import React, { useEffect, useState } from "react";
import TestDoc from "./test_doc.jpg";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import ApiService from "../service/ApiService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const doctorId = localStorage.getItem("doctorId");
const jwtToken = localStorage.getItem("jwtToken");

export function SideNavBarDoctor() {
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [completeImageUrl, setCompleteImageUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    doctorsDetails();
  }, [doctorId]);

  const doctorsDetails = async () => {
    try {
      const response = await ApiService.findDoctorById(doctorId, {
        Authorization: `Bearer ${jwtToken}`,
      });

      if (response.status === 200) {
        setDoctorProfile(response.data);
        console.log(
          "Getting doctor details here " +
            JSON.stringify(doctorProfile && doctorProfile.firstname)
        );
      } else {
        console.log(
          "Failed to fetch doctor details. Status: " + response.status
        );
      }
    } catch (error) {
      console.log(
        "An error occurred while trying to fetch data: " + error.message
      );
    }
  };

  console.log("Image URL:", doctorProfile?.profilePicture?.imageUrl);

  const handleCompleteImageUrl = () => {
    setCompleteImageUrl(
      doctorProfile?.profilePicture?.imageUrl
        ? `http://${doctorProfile.profilePicture.imageUrl}`
        : null
    );
  };

  useEffect(() => {
    handleCompleteImageUrl();
  }, [doctorId, doctorProfile]);

  const handleSignout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleDashboard = () => {
    navigate("/doctor-dashboard");
  };

  return (
    <Card className="h-[calc(100vh-2rem)] w-full md:w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-1 p-2 w-full border shadow-sm ">
        <div className="flex items-center justify-center">
        
          <img
            src={completeImageUrl ? completeImageUrl : "image loading"}
            alt={doctorProfile?.firstname}
            className="h-32 w-32 rounded-full mt-12"
          />
        </div>

        <div className="flex flex-col justify-center mb-12 mt-4 items-center">
          <Typography variant="h5" color="blue-gray">
            <span>Dr.</span>
            {doctorProfile?.firstname}
          </Typography>
          <Typography variant="subtitle2" color="blue-gray">
            {doctorProfile?.specialization}
          </Typography>
        </div>
      </div>
      <List>
        <ListItem onClick={handleDashboard}>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/doctor-dashboard">Dashboard</Link>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/doctor-appointments">Doctors Appoinments</Link>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/doctor-patients">Patient List</Link>
          <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="blue-gray"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/doctors-schedule">Schedule</Link>
          <ListItemSuffix>
            <Chip
              value="14"
              size="sm"
              variant="ghost"
              color="red"
              className="rounded-full"
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/doctor-setting">Settings</Link>
        </ListItem>
        <ListItem onClick={handleSignout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          <Link to="/login">Log Out</Link>
        </ListItem>
      </List>
    </Card>
  );
}
