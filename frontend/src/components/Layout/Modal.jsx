/* eslint-disable react/prop-types */
import { useEffect } from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onCancel, onConfirm, children }) => {
  // Close the modal if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.id === "modal-overlay") {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onCancel]);

  // Close modal on pressing ESC key
  useEffect(() => {
    const handleEscClose = (event) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onCancel]);

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  // Create the modal in the portal
  return ReactDOM.createPortal(
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 p-6">
        <button
          onClick={onCancel}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
        <div>{children}</div>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
