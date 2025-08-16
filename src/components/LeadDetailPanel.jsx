// src/components/LeadDetailPanel.jsx
import React, { useState } from "react";

export default function LeadDetailPanel({ lead, onSave, saving, error, onClose }) {
  const [email, setEmail] = useState(lead.email);
  const [status, setStatus] = useState(lead.status);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSave = () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }
    onSave({ email, status });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-semibold">Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
        {emailError && <p className="text-red-600 text-sm">{emailError}</p>}
      </div>

      <div>
        <label className="block font-semibold">Status</label>
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

      {error && <p className="text-red-600">{error}</p>}

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded text-white ${saving ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          disabled={saving}
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
    </div>
  );
}
