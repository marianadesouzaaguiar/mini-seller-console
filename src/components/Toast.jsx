import React, { useEffect, useState } from "react";
import {
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ message, onClose, duration = 4000 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  useEffect(() => {
    if (!visible && message) {
      const timer = setTimeout(() => onClose(), 400);
      return () => clearTimeout(timer);
    }
  }, [visible, message, onClose]);

  if (!message) return null;

  let bgColor = "bg-gray-50 text-gray-900 shadow-md";
  let Icon = XMarkIcon;

  if (message.startsWith("✅")) {
    bgColor = "bg-green-50 text-green-800 shadow-lg";
    Icon = CheckCircleIcon;
  } else if (message.startsWith("⚠️")) {
    bgColor = "bg-yellow-50 text-yellow-800 shadow-lg";
    Icon = ExclamationTriangleIcon;
  } else if (message.startsWith("❌")) {
    bgColor = "bg-red-50 text-red-800 shadow-lg";
    Icon = XCircleIcon;
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`fixed top-6 right-6 max-w-sm w-full p-4 rounded-xl flex items-center gap-3 ${bgColor} z-50`}
        >
          <Icon className="w-6 h-6 flex-shrink-0" />
          <span className="flex-1 text-sm font-medium">{message}</span>
          <button
            onClick={() => setVisible(false)}
            className="ml-2 p-1 rounded hover:bg-gray-200 transition"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
