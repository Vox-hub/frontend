import React from "react";
import { Modal, ModalOverlay } from "@chakra-ui/react";

const CustomModal = ({ isCentered, children, isOpen, onClose }) => {
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      isCentered={isCentered}
      motionPreset="slideInBottom"
    >
      <ModalOverlay
        style={{
          backdropFilter: "blur(2px)",
        }}
      />
      {children}
    </Modal>
  );
};

export default CustomModal;
