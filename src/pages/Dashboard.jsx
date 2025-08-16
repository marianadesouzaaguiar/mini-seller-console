import React from "react";
import LeadsList from "../components/LeadsList";
import { useAppContext } from "../AppContext";

export default function Dashboard() {
  const { opportunities } = useAppContext();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        📊 Dashboard
      </h1>
      <LeadsList />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Opportunities</h2>

        {opportunities.length === 0 ? (
          <p className="text-gray-500 italic">No opportunities yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Stage</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Account</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {opportunities.map((o) => (
                  <tr
                    key={o.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-4 py-2">{o.name}</td>
                    <td className="px-4 py-2">{o.stage}</td>
                    <td className="px-4 py-2">{o.amount}</td>
                    <td className="px-4 py-2">{o.account}</td>
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
