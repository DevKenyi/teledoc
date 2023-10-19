import React, { useContext, useEffect, useState } from "react";
import {} from "@heroicons/react/outline";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  Switch,
  Collapse,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";

import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    path: "/dashboard",
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
    path: "/login",
  },
];

function ProfileMenu() {
  // const { userData } = useContext(AuthContext);
  // console.log("Data coming from Nav " + userData);
  // const { profilePicture } = userData || {}; // Add a conditional check to assign an empty object if userData is null or undefined
  // console.log(profilePicture?.imageUrl);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.clear();

    navigate("/login");
  };

  const handleMenuItemClick = (path) => {
    // Close the menu
    closeMenu();

    // Check the path of the clicked menu item and perform the corresponding action
    if (path === "/login") {
      handleSignOut(); // Sign Out
    } else if (path === "/dashboard") {
      // Redirect to the dashboard or profile page
      navigate(path);
    } else if (path === "/edit-profile") {
      // Redirect to the edit profile page
      navigate(path);
    } else if (path === "/inbox") {
      // Redirect to the inbox page
      navigate(path);
    } else if (path === "/help") {
      // Redirect to the help page
      navigate(path);
    }
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          {/* {profilePicture?.imageUrl ? (
            <Avatar
              variant="circular"
              size="sm"
              alt="candice wu"
              className="border border-blue-500 p-0.5"
              src={profilePicture.imageUrl}
            />
          ) : (
            <UserCircleIcon className="h-6 w-6" />
          )} */}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, path }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => handleMenuItemClick(path)} // Use handleMenuItemClick for all menu items
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

// nav list menu
const navListMenuItems = [
  {
    title: "Home",
    description: "Go to the home page",
    path: "/dashboard",
  },
  {
    title: "Appointments",
    description: "Manage your appointments",
    path: "/appointments",
  },
  {
    title: "Doctors Pool",
    description: "Find and connect with doctors",
    path: "/doctors-list",
  },
  {
    title: "Diagnostic Report",
    description: "Manage your medications",
    path: "/tests",
  },
  {
    title: "Reports and Analytics",
    description: "View and download medical reports",
    path: "/report",
  },
  {
    title: "Alert and Notification",
    description: "Manage your account settings",
    path: "/settings",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const triggers = {
    onMouseEnter: () => setIsMenuOpen(true),
    onMouseLeave: () => setIsMenuOpen(false),
  };

  const renderItems = navListMenuItems.map(({ title, description, path }) => (
    <Link to={path} key={title}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {description}
        </Typography>
      </MenuItem>{" "}
    </Link>
  ));

  return (
    <React.Fragment>
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal">
            <MenuItem
              {...triggers}
              className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full"
            >
              <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList
          {...triggers}
          className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid"
        >
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 text-blue-gray-900 lg:hidden">
        <Square3Stack3DIcon className="h-[18px] w-[18px]" /> Pages{" "}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
    </React.Fragment>
  );
}

// nav list component
const navListItems = [
  {
    label: "Profile",
    icon: UserCircleIcon,
    path: "/dashboard",
  },
  {
    label: "Appointments",
    icon: CubeTransparentIcon,
    path: "/appointments",
  },
  {
    label: "Doctors",
    icon: CodeBracketSquareIcon,
    path: "/doctors-list",
  },
  {
    label: "Diagnostic Report",
    icon: CodeBracketSquareIcon,
    path: "/tests",
  },
  {
    label: "Alerts",
    icon: CodeBracketSquareIcon,
    path: "/alerts",
  },
];

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu />
      {navListItems.map(
        (
          { label, icon, path } // Add path to the map function arguments
        ) => (
          <Typography
            key={label}
            as={Link} // Change as="a" to as={Link}
            to={path} // Pass the path to the to prop
            variant="small"
            color="blue-gray"
            className="font-normal"
          >
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
              {label}
            </MenuItem>
          </Typography>
        )
      )}
    </ul>
  );
}

export default function NavBar() {
  const { userInfo, setUserInfo } = React.useState(null);

  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <Navbar>
        <div className="relative mx-auto flex items-center text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
          >
            eHealth
          </Typography>
          <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
            <NavList />
          </div>
          <IconButton
            size="sm"
            color="blue-gray"
            variant="text"
            onClick={toggleIsNavOpen}
            className="ml-auto mr-2 lg:hidden"
          >
            <Bars2Icon className="h-6 w-6" />
          </IconButton>
          <ProfileMenu />
        </div>
        <Collapse open={isNavOpen} className="overflow-scroll">
          <NavList />
        </Collapse>
      </Navbar>
    </div>
  );
}
