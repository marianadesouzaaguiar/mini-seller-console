import React, { useState, useEffect } from "react";

export default function LeadDetailPanel({
  lead,
  onSave,
  onClose,
  saving,
  error,
  onConvert,
}) {
  const [editedLead, setEditedLead] = useState({ ...lead });
  const [emailError, setEmailError] = useState("");

  useEffect(() => {
    setEditedLead(lead);
    setEmailError("");
  }, [lead]);

  const handleChange = (field, value) => {
    setEditedLead((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveClick = async () => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedLead.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    await onSave(editedLead);
    onClose(); // Close SlideOver after successful save
  };

  const handleConvertClick = () => {
    onConvert(); // Handles converting lead to opportunity
    onClose();   // Close SlideOver
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-end z-50">
      <div className="bg-white w-full md:w-1/3 p-6 overflow-auto shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Lead</h2>

        <div className="mb-2">
          <label className="block font-medium">Name</label>
          <input
            type="text"
            value={editedLead.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
        </div>

        <div className="mb-2 relative">
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={editedLead.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className={`border px-2 py-1 rounded w-full ${
              emailError ? "border-red-500" : ""
            }`}
          />
          {emailError && (
            <p className="text-red-600 text-sm mt-1">{emailError}</p>
          )}
        </div>

        <div className="mb-2">
          <label className="block font-medium">Company</label>
          <input
            type="text"
            value={editedLead.company}
            onChange={(e) => handleChange("company", e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium">Status</label>
          <select
            value={editedLead.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className="border px-2 py-1 rounded w-full"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleSaveClick}
              disabled={saving}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleConvertClick}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Convert to Opportunity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
