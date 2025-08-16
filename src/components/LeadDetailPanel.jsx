import React, { useState, useEffect } from "react";
import { useAppContext } from "../AppContext";

export default function LeadDetailPanel({ onClose }) {
  const { selectedLead, handleSaveLead, handleConvertToOpportunity, saving, saveError } =
    useAppContext();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [emailError, setEmailError] = useState("");

  // Atualiza campos sempre que selectedLead muda
  useEffect(() => {
    if (selectedLead) {
      setEmail(selectedLead.email || "");
      setStatus(selectedLead.status || "");
      setEmailError("");
    }
  }, [selectedLead]);

  if (!selectedLead) return null;

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSave = () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }
    handleSaveLead({ email, status });
  };

  const handleConvert = () => {
    handleConvertToOpportunity(selectedLead);
    onClose(); // fecha painel após conversão
  };

  return (
    <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg p-6 overflow-y-auto z-50 animate-slide-in">
      <h2 className="text-2xl font-bold mb-4">Lead Details</h2>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
        {emailError && <p className="text-red-600 text-sm mt-1">{emailError}</p>}
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      {saveError && <p className="text-red-600 mb-4">{saveError}</p>}

      <div className="flex gap-2 mb-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`px-4 py-2 rounded text-white ${saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {saving ? "Saving..." : "Save"}
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>

      <hr className="my-4" />

      <button
        onClick={handleConvert}
        className="w-full px-4 py-2 rounded bg-green-600 hover:bg-green-700 text-white"
      >
        Convert to Opportunity
      </button>
    </div>
  );
}
