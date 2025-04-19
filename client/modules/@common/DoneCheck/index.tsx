import React from "react";

interface DoneCheckmarkProps {
  size?: number;
  color?: string;
  center?: boolean;
}

const DoneCheckmark: React.FC<DoneCheckmarkProps> = ({
  size = 40,
  color = "#10b981", // Tailwind green-500
  center = false,
}) => {
  return (
    <div
      className={`${center ? "flex justify-center items-center  w-full h-full" : ""}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 52 52"
        className="animate-check"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="26"
          cy="26"
          r="25"
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M16 27L23 34L36 20"
          stroke={color}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="checkmark-path"
        />
      </svg>

      <style jsx>{`
        .animate-check {
          animation: pop 0.3s ease-out;
        }

        @keyframes pop {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          60% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }

        .checkmark-path {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: draw 0.6s ease forwards;
          animation-delay: 0.2s;
        }

        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default DoneCheckmark;
