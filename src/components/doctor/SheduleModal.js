import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

export function ScheduleModal({ handleOpen }) {
  const [open, setOpen] = React.useState(false);

  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  const handleCancel = () => {
    console.log("Cancel button clicked");
    closeDialog();
  };
  const handleSchedule = () => {
    console.log("Yes, schedule me ");
    closeDialog();
  };

  // Check if handleOpen is called and open the dialog accordingly
  React.useEffect(() => {
    if (handleOpen) {
      openDialog();
    }
  }, [handleOpen]);

  return (
    <>
      <Dialog open={open} handler={() => closeDialog()}>
        {/* <DialogHeader className="text-center">
          Are you sure you want to schedule this patient ?
        </DialogHeader> */}
        <DialogBody className="text-center font-bold">
          Are you sure you want to schedule this patient ?
        </DialogBody>
        <DialogFooter className="flex flex-row justify-center">
          <Button
            variant="text"
            onClick={handleCancel}
            className="mr-1 bg-red-500 text-white font-bold"
          >
            <span>No, I do not want to schedule now</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              closeDialog();
              handleSchedule();
            }}
          >
            <span>Yes, Schedule Patient</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
