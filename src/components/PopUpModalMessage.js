import { Button, Modal } from "flowbite-react";
import { useState } from "react";

import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function PopUpModalMessage({ setOpenModal }) {
  const [modalVisible, setModalVisible] = useState(true);
  const handleCloseModal = () => {
    setModalVisible(false);
    setOpenModal(false);
  };

  if (!modalVisible) {
    return null; // Return null to hide the modal content
  }
  return (
    <Modal show={true} size="md" popup onClose={() => setOpenModal(false)}>
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Congratulations, your booking is pending. You will receive a
            confirmation if you are scheduled by the doctor.
          </h3>
          <Button onClick={handleCloseModal} color="blue-gray">
            Close
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
