import { useEffect } from "react";
import { useDyteClient } from "@dytesdk/react-web-core";
import { DyteMeeting } from "@dytesdk/react-ui-kit";

const MeedingVideoConferencing = ({ authToken }) => {
  const [meeting, initMeeting] = useDyteClient();
  useEffect(() => {
    if (!authToken) {
      alert(
        "An authToken wasn't passed, please pass an authToken in the prop to join a meeting."
      );
      return;
    }

    initMeeting({
      authToken: authToken,
      defaults: {
        audio: false,
        video: false,
      },
    });
  }, [authToken]);

  return <DyteMeeting meeting={meeting} />;
};

export default MeedingVideoConferencing;
