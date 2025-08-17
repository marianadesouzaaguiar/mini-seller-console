import React from "react";

export default function LeadDetailPanel({ lead, onSave, saving, error, onClose, onConvert }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-end z-50">
      <div className="w-full sm:w-96 bg-white p-6 overflow-y-auto animate-slide-in">
        <h2 className="text-xl font-semibold mb-4">Lead Details</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <p>{lead.name}</p>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            defaultValue={lead.email}
            onChange={(e) => (lead.email = e.target.value)}
            className="border w-full px-3 py-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Status</label>
          <select
            defaultValue={lead.status}
            onChange={(e) => (lead.status = e.target.value)}
            className="border w-full px-3 py-2 rounded"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>
        </div>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <div className="flex justify-between gap-2 mt-6">
          <button
            onClick={() => onSave(lead)}
            disabled={saving}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            onClick={onConvert}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Convert to Opportunity
          </button>
          <button
            variant="outline"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
