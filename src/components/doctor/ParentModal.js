import React, { useState } from "react";
import { CreateMeetingModal } from "./CreateMeetingModal";
import { ScheduleModal } from "./SheduleModal";

export const ParentModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CreateMeetingModal setOpen={setOpen} />
      <ScheduleModal />
    </>
  );
};
