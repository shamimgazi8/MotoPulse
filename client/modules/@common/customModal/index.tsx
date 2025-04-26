import React, { useEffect } from "react";

interface CustomModalProps {
  visible: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  title,
  content,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    // Prevent scrolling of the background when the modal is visible
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup function to reset overflow when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);

  return visible ? (
    <div className={`custom-modal-overlay show`}>
      <div className="custom-modal">
        <h2>{title}</h2>
        <p>{content}</p>
        <div className="custom-modal-buttons">
          <button className="confirm-btn" onClick={onConfirm}>
            Discard
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default CustomModal;
