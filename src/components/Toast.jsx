import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ message, onClose }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-6 right-6 z-50 max-w-xs bg-gray-800 text-white px-5 py-3 rounded-lg shadow-lg border-l-4 border-indigo-400 flex items-center justify-between gap-2"
        >
          <span className="text-sm">{message}</span>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white transition"
          >
            ✖️
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
