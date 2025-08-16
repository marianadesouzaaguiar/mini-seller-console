import React from "react";
import { useAppContext } from "../AppContext";
import LeadDetailPanel from "./LeadDetailPanel";

export default function LeadsList() {
  const {
    leads,
    loading,
    error,
    selectedLead,
    setSelectedLead,
    handleConvertToOpportunity,
    handleSaveLead,
    saving,
    saveError,
  } = useAppContext();

  if (loading) return <p className="text-gray-500">Loading leads...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Company</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Source</th>
            <th className="px-4 py-2 text-left">Score</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50 cursor-pointer">
              <td className="px-4 py-2">{lead.name}</td>
              <td className="px-4 py-2">{lead.company}</td>
              <td className="px-4 py-2">{lead.email}</td>
              <td className="px-4 py-2">{lead.source}</td>
              <td className="px-4 py-2">{lead.score}</td>
              <td className="px-4 py-2">{lead.status}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => setSelectedLead(lead)}
                  className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleConvertToOpportunity(lead)}
                  className="px-3 py-1 bg-green-500 text-white rounded"
                >
                  Convert
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedLead && (
        <LeadDetailPanel
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onSave={handleSaveLead}
          saving={saving}
          error={saveError}
        />
      )}
    </div>
  );
}
