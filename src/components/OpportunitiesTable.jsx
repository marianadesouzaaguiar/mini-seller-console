import React, { useState } from "react";
import { useAppContext } from "../AppContext";

export default function OpportunitiesTable() {
  const { opportunities } = useAppContext();
  const [stageFilter, setStageFilter] = useState("All");
  const stages = ["All", "Prospecting", "Qualified", "Negotiation", "Closed"];

  const filteredOpportunities =
    stageFilter === "All"
      ? opportunities
      : opportunities.filter((o) => o.stage === stageFilter);

  if (filteredOpportunities.length === 0) return <p className="mt-4 italic text-gray-500">No opportunities yet.</p>;

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <label className="font-semibold">Filter by Stage:</label>
        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {stages.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Stage</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Account</th>
            </tr>
          </thead>
          <tbody>
            {filteredOpportunities.map((o) => (
              <tr
                key={o.id}
                className={`hover:bg-gray-100 transition-colors duration-200 ${
                  o.amount && parseFloat(o.amount) > 10000 ? "bg-green-50 font-semibold" : ""
                }`}
              >
                <td className="px-4 py-2">{o.name}</td>
                <td className="px-4 py-2">{o.stage}</td>
                <td className="px-4 py-2">{o.amount || "-"}</td>
                <td className="px-4 py-2">{o.accountName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
