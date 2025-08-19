// src/components/Toast.jsx
import React, { useEffect } from "react";

export default function Toast({ message, type = "info", onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000); // Toast mais curto
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  // Cores ajustadas para combinar com legenda e status
  const typeStyles = {
    info: "bg-blue-200 text-blue-900 border border-blue-400",
    success: "bg-green-200 text-green-900 border border-green-400",
    warning: "bg-yellow-200 text-yellow-900 border border-yellow-400",
    error: "bg-red-200 text-red-900 border border-red-400",
    lost: "bg-red-100 text-red-700 border border-red-400", // status Lost
  };

  return (
    <div
      className={`fixed top-16 right-6 z-50 px-3 py-1.5 rounded-lg font-medium shadow-md text-sm ${typeStyles[type] || typeStyles.info} transition-all duration-300`}
    >
      {message}
    </div>
  );
}
