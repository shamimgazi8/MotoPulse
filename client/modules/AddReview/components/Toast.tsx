import React from "react";

interface ToastProps {
  customToast: { type: string; message: string };
  showToastAnimation: boolean;
}

const Toast: React.FC<ToastProps> = ({ customToast, showToastAnimation }) => {
  return (
    <div
      className={`fixed top-[100px] right-5 px-4 py-2 rounded-lg shadow-lg text-white z-50 transition-all duration-500 ease-in-out transform
        ${customToast.type === "error" ? "bg-red-500" : "bg-green-500"} 
        ${showToastAnimation ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
    >
      {customToast.message}
    </div>
  );
};

export default Toast;
