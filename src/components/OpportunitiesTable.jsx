// src/components/OpportunitiesTable.jsx
import React from "react";
import StatusDropdown from "./StatusDropdown";

export default function OpportunitiesTable({ opportunities, onUpdateStatus }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map((opportunity) => (
            <tr
              key={opportunity.id}
              className="border-b border-gray-200 dark:border-gray-700 
                         hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <td className="p-3">{opportunity.name}</td>
              <td className="p-3">{opportunity.email}</td>
              <td className="p-3">
                <StatusDropdown
                  value={opportunity.status}
                  onChange={(newStatus) =>
                    onUpdateStatus(opportunity.id, newStatus)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
