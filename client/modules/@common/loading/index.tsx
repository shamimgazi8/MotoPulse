import React from "react";

interface LoadingDotsProps {
  color?: string; // Tailwind color class
  size?: number; // dot size
  center?: boolean; // center in container
}

const LoadingDots: React.FC<LoadingDotsProps> = ({
  color = "bg-blue-600",
  size = 12,
  center = false,
}) => {
  return (
    <div
      className={`${center ? "flex justify-center items-center" : ""} w-full h-full`}
    >
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`rounded-full ${color}`}
            style={{
              width: size,
              height: size,
              animation: `bounce 1s infinite ${i * 0.2}s`,
            }}
          />
        ))}
      </div>
      <style jsx>{`
        @keyframes bounce {
          0%,
          80%,
          100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingDots;
