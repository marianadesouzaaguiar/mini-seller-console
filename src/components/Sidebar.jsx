import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-56 bg-gray-100 p-4 hidden md:block">
      <h3 className="font-semibold mb-4">Menu</h3>
      <ul className="flex flex-col gap-2">
        <li>
          <Link to="/" className="hover:underline">Dashboard</Link>
        </li>
        <li>
          <Link to="/opportunities" className="hover:underline">Opportunities</Link>
        </li>
      </ul>
    </aside>
  );
}
