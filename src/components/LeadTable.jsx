// src/components/LeadTable.jsx
import React from "react";

export default function LeadTable({
  leads,
  query,
  status,
  sortDesc,
  onQuery,
  onStatus,
  onToggleSort,
  onRowClick,
}) {
  // Filtro, busca e sort
  let filtered = [...leads];
  if (query.trim()) {
    filtered = filtered.filter(
      (l) =>
        l.name.toLowerCase().includes(query.toLowerCase()) ||
        l.company.toLowerCase().includes(query.toLowerCase())
    );
  }
  if (status !== "All") filtered = filtered.filter((l) => l.status === status);
  filtered.sort((a, b) => (sortDesc ? b.score - a.score : a.score - b.score));

  return (
    <div className="p-4 border rounded-md">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or company"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          className="w-full sm:w-1/2 px-3 py-2 border rounded-md"
        />
        <select
          value={status}
          onChange={(e) => onStatus(e.target.value)}
          className="w-full sm:w-1/4 px-3 py-2 border rounded-md"
        >
          <option value="All">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>
        <button
          className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={onToggleSort}
        >
          Sort Score {sortDesc ? "↓" : "↑"}
        </button>
      </div>

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
            </tr>
          </thead>
          <tbody>
            {filtered.map((lead) => (
              <tr
                key={lead.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() => onRowClick?.(lead)}
              >
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
      </div>
    </div>
  );
}
