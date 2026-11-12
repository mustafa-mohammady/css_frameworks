import CloseButton from "react-bootstrap/CloseButton";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

type AppToastProps = {
  show: boolean;
  message: string;
  onClose: () => void;
};

export default function AppToast({ show, message, onClose }: AppToastProps) {
  return (
    <ToastContainer position="bottom-end" containerPosition="fixed" className="p-3">
      <Toast show={show} onClose={onClose} autohide delay={3000} bg="success">
        <div className="d-flex align-items-center">
          <Toast.Body className="text-white">{message}</Toast.Body>
          <CloseButton
            variant="white"
            className="me-2 ms-auto"
            aria-label="Close message"
            onClick={onClose}
          />
        </div>
      </Toast>
    </ToastContainer>
  );
}
