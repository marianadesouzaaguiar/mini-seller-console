import React, { useState } from "react";
import { useAppContext } from "../AppContext";
import LeadDetailPanel from "../components/LeadDetailPanel";

export default function Dashboard() {
  const {
    leads,
    loading,
    error,
    selectedLead,
    setSelectedLead,
    handleSaveLead,
    saving,
    saveError,
    handleConvertToOpportunity,
    opportunities,
  } = useAppContext();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortDesc, setSortDesc] = useState(true);

  const filteredLeads = leads
    .filter((lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase())
    )
    .filter((lead) => (statusFilter ? lead.status === statusFilter : true))
    .sort((a, b) => (sortDesc ? b.score - a.score : a.score - b.score));

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded flex-1 min-w-[200px]"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>
        <select
          value={sortDesc ? "desc" : "asc"}
          onChange={(e) => setSortDesc(e.target.value === "desc")}
          className="border px-3 py-2 rounded"
        >
          <option value="desc">Score: High → Low</option>
          <option value="asc">Score: Low → High</option>
        </select>
      </div>

      {/* Leads Table */}
      <div className="overflow-x-auto mb-8">
        {loading && <p className="text-gray-500">Loading leads...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && (
          <table className="w-full border border-gray-200 rounded-lg shadow-sm bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Company</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Score</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                  onClick={() => setSelectedLead(lead)}
                >
                  <td className="px-4 py-2">{lead.name}</td>
                  <td className="px-4 py-2">{lead.company}</td>
                  <td className="px-4 py-2">{lead.email}</td>
                  <td className="px-4 py-2">{lead.score}</td>
                  <td className="px-4 py-2">{lead.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Slide-over */}
      {selectedLead && (
        <LeadDetailPanel
          lead={selectedLead}
          onSave={handleSaveLead}
          saving={saving}
          error={saveError}
          onClose={() => setSelectedLead(null)}
          onConvert={() => {
            handleConvertToOpportunity(selectedLead);
            setSelectedLead(null);
          }}
        />
      )}

      {/* Opportunities */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Opportunities</h2>
        {opportunities.length === 0 ? (
          <p className="text-gray-500 italic">No opportunities yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg shadow-sm bg-white">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Stage</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Account</th>
                </tr>
              </thead>
              <tbody>
                {opportunities.map((o) => (
                  <tr
                    key={o.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-4 py-2">{o.name}</td>
                    <td className="px-4 py-2">{o.stage}</td>
                    <td className="px-4 py-2">{o.amount || "-"}</td>
                    <td className="px-4 py-2">{o.accountName || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
