import { useState, useDisclosure } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
} from "@chakra-ui/react";

function EditTaskForm({ isOpen, onClose, initialName, onSave }) {
  const [taskName, setTaskName] = useState(initialName);

  const handleSave = () => {
    onSave(taskName);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader marginTop={5}>Edit your task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={(e) => {
            e.preventDefault(); 
            handleSave(); 
          }}>
            <Input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Write your new task here"
            />
          </form>
        </ModalBody>

        <ModalFooter>
          <Button bgColor="#494BD6" type="submit" mr={3} color="white" onClick={handleSave}>
            Save
          </Button>
          <Button variant="solid" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditTaskForm;
