import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ErrorModal = (props: {
  header: string;
  message: string;
  onClose: () => void;
}) => {
  return (
    <>
      <Modal
        show={!!props.message}
        onHide={props.onClose}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ErrorModal;
