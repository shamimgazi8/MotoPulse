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
    <div className="cs-md-ov show">
      <div className="ccs-md">
        <h2>{title}</h2>
        <p>{content}</p>
        <div className="cs-md-bt">
          <button className="c-bt" onClick={onConfirm}>
            {title === "Discard changes?" ? "Discard" : "Delete"}
          </button>
          <button className="ca-bt" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default CustomModal;
