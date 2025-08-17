import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Toast from "./Toast";

export default function LeadDetailPanel({ lead, onSave, saving, error, onClose, onConvert, darkMode }) {
  const [patch, setPatch] = useState({ ...lead });
  const [localError, setLocalError] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    setPatch({ ...lead });
    setLocalError("");
  }, [lead]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatch((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const validateAll = () => {
    for (let key of ["name", "company", "email", "source", "score", "status"]) {
      if (!patch[key] || patch[key].toString().trim() === "") {
        setLocalError(`${key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty`);
        return false;
      }
    }
    if (!validateEmail(patch.email)) {
      setLocalError("Invalid email address");
      return false;
    }
    setLocalError("");
    return true;
  };

  const handleSaveClick = async () => {
    if (!validateAll()) return;
    await onSave(patch);
    setToastMsg("Lead saved!");
  };

  const handleConvertClick = async () => {
    if (!validateAll()) return;
    await onConvert(patch);
    setToastMsg("Lead converted!");
  };

  const panelBg = darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900";
  const inputBg = darkMode ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-gray-100 text-gray-900 border-gray-300";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>

      <motion.div
        className={`relative w-full max-w-md h-full shadow-xl overflow-y-auto ${panelBg} transition-colors duration-500`}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
          <h2 className="text-2xl font-semibold">Lead Details</h2>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-700 transition">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="px-6 py-4 space-y-4">
          {(error || localError) && <p className="text-red-500">{error || localError}</p>}
          {toastMsg && <Toast message={toastMsg} type="success" />}

          {["name", "company", "email", "source", "score"].map((field) => (
            <div className="flex flex-col space-y-2" key={field}>
              <label className="capitalize">{field}</label>
              <input
                type={field === "email" ? "email" : field === "score" ? "number" : "text"}
                name={field}
                value={patch[field]}
                onChange={handleChange}
                className={`border px-3 py-2 rounded ${inputBg} transition-colors duration-500`}
              />
            </div>
          ))}

          <div className="flex flex-col space-y-2">
            <label>Status</label>
            <select
              name="status"
              value={patch.status}
              onChange={handleChange}
              className={`border px-3 py-2 rounded ${inputBg} transition-colors duration-500`}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
        </div>

        <div className="px-6 py-4 flex justify-end space-x-3 border-t border-gray-700">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConvertClick}
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg transition"
          >
            Convert
          </button>
          <button
            onClick={handleSaveClick}
            disabled={saving}
            className={`px-4 py-2 rounded-lg transition ${saving ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-500 text-white"}`}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
