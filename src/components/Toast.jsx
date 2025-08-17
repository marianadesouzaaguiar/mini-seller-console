import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ message, type = "green", duration = 2500 }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const colors = type === "red" ? "bg-red-600 text-white" : "bg-green-600 text-white";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-5 right-5 px-4 py-2 rounded shadow ${colors} z-50`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
