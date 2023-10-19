import { useEffect } from "react";
import { useDyteClient } from "@dytesdk/react-web-core";
import { DyteMeeting } from "@dytesdk/react-ui-kit";

const MeedingVideoConferencing = () => {
  const [meeting, initMeeting] = useDyteClient();

  useEffect(() => {
    const searchParams = new URL(window.location.href).searchParams;
    const authToken = searchParams.get("authToken");
    if (!authToken) {
      alert(
        "An authToken wasn't passed, please pass an authToken in the prop to join a meeting."
      );
      return;
    }

    initMeeting({
      authToken: authToken, // Use authToken here, not token
      defaults: {
        audio: false,
        video: false,
      },
    });
  }, []); // Empty dependency array if you want to run this effect once

  return <DyteMeeting meeting={meeting} />;
};

export default MeedingVideoConferencing;
