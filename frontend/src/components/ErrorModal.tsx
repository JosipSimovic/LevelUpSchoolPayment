import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ErrorModal = (props: { message: string; onClose: () => void }) => {
  const errorList = props.message.trim().split("\n");

  return (
    <>
      <Modal
        show={!!props.message}
        onHide={props.onClose}
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {errorList.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </Modal.Body>
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
