import React from "react";

export default function OpportunitiesTable({
  opportunities = [],
  darkMode,
  stageFilter,
  setStageFilter,
  getStatusColor,
  getRowBg,
  getRowHover,
}) {
  const filteredOpportunities = opportunities.filter((o) =>
    stageFilter ? o.stage.toLowerCase() === stageFilter.toLowerCase() : true
  );

  return (
    <div className="overflow-x-auto w-full mb-8">
      <h2 className="text-2xl font-semibold mb-2 text-green-400">💼 Opportunities</h2>

      {/* Stage Filter */}
      <div className="flex gap-4 mb-4">
        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className={`border px-4 py-2 rounded-lg shadow-sm transition-colors duration-500 ${
            darkMode ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-300"
          }`}
        >
          <option value="">All Stages</option>
          <option value="Prospecting">Prospecting</option>
          <option value="Engaged">Engaged</option>
          <option value="Negotiation">Negotiation</option>
        </select>
      </div>

      {filteredOpportunities.length === 0 ? (
        <p className="italic text-gray-400">No opportunities available.</p>
      ) : (
        <table
          className={`min-w-full table-auto rounded-xl shadow-md ${
            darkMode ? "bg-gray-800" : "bg-white"
          } transition-colors duration-500`}
        >
          <thead className={`${darkMode ? "bg-gray-700 text-gray-100" : "bg-green-100 text-green-800"}`}>
            <tr>
              <th className="px-4 py-1.5 text-left">ID</th>
              <th className="px-4 py-1.5 text-left">Name</th>
              <th className="px-4 py-1.5 text-left">Stage</th>
              <th className="px-4 py-1.5 text-left">Amount</th>
              <th className="px-4 py-1.5 text-left">Account</th>
            </tr>
          </thead>
          <tbody>
            {filteredOpportunities.map((o, index) => (
              <tr
                key={o.id}
                className={`transition-all duration-200 border-b ${getRowBg(index, darkMode)} ${getRowHover(
                  darkMode
                )}`}
              >
                <td className="px-4 py-1.5">{o.id}</td>
                <td className="px-4 py-1.5">{o.name}</td>
                <td
                  className={`px-3 py-1 min-w-[70px] text-center rounded-full inline-block font-medium text-xs ${getStatusColor(
                    o.stage
                  )}`}
                >
                  {o.stage}
                </td>
                <td className="px-4 py-1.5">{o.amount || "-"}</td>
                <td className="px-4 py-1.5">{o.accountName || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
