// src/components/StatusDropdown.jsx
import React from "react";

export default function StatusDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border px-2 py-1 rounded-lg bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100"
    >
      <option value="Prospecting">Prospecting</option>
      <option value="Engaged">Engaged</option>
      <option value="Negotiation">Negotiation</option>
    </select>
  );
}
