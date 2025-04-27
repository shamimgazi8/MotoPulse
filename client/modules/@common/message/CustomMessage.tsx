import React, { useEffect, useState } from "react";

type CustomMessageProps = {
  type: "success" | "error" | "warning";
  text: string;
  onClose: () => void;
};

const typeColors = {
  success: "#52c41a",
  error: "#ff4d4f",
  warning: "#faad14",
};

const CustomMessage: React.FC<CustomMessageProps> = ({
  type,
  text,
  onClose,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger open animation
    setVisible(true);

    // Start timer to close after 3 seconds
    const timer = setTimeout(() => {
      setVisible(false); // Start close animation
      setTimeout(() => onClose(), 300); // Wait for fade-out to finish
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: "#262626",
        padding: "10px 20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        borderLeft: `5px solid ${typeColors[type]}`,
        borderRadius: "4px",
        zIndex: 9999,
        color: "#fff",
        minWidth: "250px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-20px)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <div style={{ marginBottom: "8px" }}>{text}</div>
      {/* Progress Bar */}
      <div
        style={{
          height: "4px",
          backgroundColor: "#ffffff33",
          overflow: "hidden",
          borderRadius: "2px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: typeColors[type],
            animation: "progressBar 3s linear forwards",
          }}
        />
      </div>
      <style>
        {`
          @keyframes progressBar {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}
      </style>
    </div>
  );
};

export default CustomMessage;
