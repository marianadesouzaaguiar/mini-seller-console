import React, { useState } from "react";
import { useAppContext } from "../AppContext";
import LeadDetailPanel from "../components/LeadDetailPanel";
import LeadsList from "../components/LeadsList";

export default function LeadsPage() {
  const {
    leads,
    loading,
    error,
    selectedLead,
    setSelectedLead,
    handleSaveLead,
    saving,
    saveError,
    handleConvertToOpportunity
  } = useAppContext();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortDesc, setSortDesc] = useState(true);

  // Filtered, searched, and sorted leads
  const filteredLeads = leads
    .filter((lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase())
    )
    .filter((lead) => (statusFilter ? lead.status === statusFilter : true))
    .sort((a, b) => (sortDesc ? b.score - a.score : a.score - b.score));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Leads Page</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by name or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded w-1/3"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-2 py-1 rounded"
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
          className="border px-2 py-1 rounded"
        >
          <option value="desc">Score: High → Low</option>
          <option value="asc">Score: Low → High</option>
        </select>
      </div>

      {/* Leads List */}
      {loading && <p className="text-gray-500">Loading leads...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <LeadsList leads={filteredLeads} onSelectLead={setSelectedLead} />
      )}

      {/* Lead Detail Panel */}
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
    </div>
  );
}
