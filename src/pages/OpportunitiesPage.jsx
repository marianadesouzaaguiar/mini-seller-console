// src/pages/OpportunitiesPage.jsx
import React from "react";
import { useAppContext } from "../AppContext";
import OpportunitiesTable from "../components/OpportunitiesTable";

export default function OpportunitiesPage() {
  const { opportunities } = useAppContext();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Opportunities</h1>
      {opportunities.length === 0 ? (
        <p className="text-gray-500">No opportunities available.</p>
      ) : (
        <OpportunitiesTable opps={opportunities} />
      )}
    </div>
  );
}
