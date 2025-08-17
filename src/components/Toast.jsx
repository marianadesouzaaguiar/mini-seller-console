import React, { useEffect, useState } from "react";
import {
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

export default function Toast({ message, onClose, duration = 4000 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  useEffect(() => {
    if (!visible && message) {
      const timer = setTimeout(() => {
        onClose();
      }, 400); // animação suave
      return () => clearTimeout(timer);
    }
  }, [visible, message, onClose]);

  if (!message) return null;

  let bgColor = "bg-gray-100 text-gray-800";
  let Icon = XMarkIcon;

  if (message.startsWith("✅")) {
    bgColor = "bg-green-100 text-green-800";
    Icon = CheckCircleIcon;
  } else if (message.startsWith("⚠️")) {
    bgColor = "bg-yellow-100 text-yellow-800";
    Icon = ExclamationTriangleIcon;
  } else if (message.startsWith("❌")) {
    bgColor = "bg-red-100 text-red-800";
    Icon = XCircleIcon; // se não existir, use XMarkIcon
  }

  return (
    <div
      className={`fixed top-6 right-6 max-w-sm w-full p-4 rounded-lg shadow-lg flex items-center gap-3
        transform transition-all duration-400 ease-out
        ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-6 scale-95"}
        ${bgColor}`}
    >
      <Icon className="w-6 h-6 flex-shrink-0" />
      <span className="flex-1 text-sm">{message}</span>
      <button
        onClick={() => setVisible(false)}
        className="ml-2 text-sm font-medium underline hover:text-gray-900"
      >
        Close
      </button>
    </div>
  );
}
