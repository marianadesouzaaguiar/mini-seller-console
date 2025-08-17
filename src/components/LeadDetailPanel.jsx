import React, { useState } from "react";

export default function LeadDetailPanel({ lead, onSave, onClose, saving, error, onConvert }) {
  const [email, setEmail] = useState(lead.email);
  const [status, setStatus] = useState(lead.status);
  const [emailError, setEmailError] = useState("");

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSave = async () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      return;
    }
    await onSave({ email, status });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-40 flex justify-end">
      <div className="bg-white w-full md:w-1/3 h-full p-6 shadow-lg overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">Edit Lead</h2>
        <div className="mb-4">
          <label className="block font-semibold">Name</label>
          <p>{lead.name}</p>
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Company</label>
          <p>{lead.company}</p>
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            className="border px-2 py-1 w-full rounded"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
          />
          {emailError && <p className="text-red-600 mt-1">{emailError}</p>}
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Status</label>
          <select
            className="border px-2 py-1 w-full rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onConvert}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Convert
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>
    </div>
  );
}
