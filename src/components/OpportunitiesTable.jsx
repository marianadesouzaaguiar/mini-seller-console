import React from "react";

export default function OpportunitiesTable({ opps }) {
  if (!opps.length)
    return <p className="text-gray-500 text-center">No opportunities yet.</p>;

  return (
    <div className="p-4 border rounded-md">
      <h2 className="font-semibold mb-2">Opportunities</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Stage</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Account</th>
            </tr>
          </thead>
          <tbody>
            {opps.map((o) => (
              <tr key={o.id} className="hover:bg-gray-50">
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
