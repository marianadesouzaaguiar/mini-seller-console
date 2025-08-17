import React, { useState } from "react";
import { useAppContext } from "../AppContext";
import LeadDetailPanel from "../components/LeadDetailPanel";
import Toast from "../components/Toast";

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
    opportunities,
    handleConvertToOpportunity,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortDesc,
    setSortDesc,
    notification,
    setNotification,
  } = useAppContext();

  const filteredLeads = leads
    .filter(
      (lead) =>
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.company.toLowerCase().includes(search.toLowerCase())
    )
    .filter((lead) => (statusFilter ? lead.status === statusFilter : true))
    .sort((a, b) => (sortDesc ? b.score - a.score : a.score - b.score));

  return (
    <div className="p-6 pt-20">
      {/* 🔹 Toast Notification */}
      <Toast message={notification} onClose={() => setNotification(null)} />

      {/* Title */}
      <h1 className="text-5xl font-bold mb-6">📊 Dashboard</h1>

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
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead className="bg-indigo-100 text-indigo-800">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Company</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Source</th>
                <th className="px-4 py-2 text-left">Score</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-indigo-50 cursor-pointer transition-colors duration-150"
                  onClick={() => setSelectedLead(lead)}
                >
                  <td className="px-4 py-2">{lead.id}</td>
                  <td className="px-4 py-2">{lead.name}</td>
                  <td className="px-4 py-2">{lead.company}</td>
                  <td className="px-4 py-2">{lead.email}</td>
                  <td className="px-4 py-2">{lead.source}</td>
                  <td className="px-4 py-2">{lead.score}</td>
                  <td className="px-4 py-2">{lead.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Slide-over for Lead details */}
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

      {/* Opportunities Table */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-green-700">
          💼 Opportunities
        </h2>
        {opportunities.length === 0 ? (
          <p className="text-gray-500 italic">No opportunities available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead className="bg-green-100 text-green-800">
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
                    className="hover:bg-green-50 transition-colors duration-150"
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

      {/* Bottom Message */}
      <div className="mt-6 text-lg font-medium text-green-800">
        Keep track of your opportunities here. Only unique leads can be converted.
      </div>
    </div>
  );
}
