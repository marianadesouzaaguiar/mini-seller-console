import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-100 p-4 shadow flex justify-between items-center">
      <h1 className="text-xl font-bold">Mini Seller Console</h1>
      <nav className="flex gap-4">
        <Link to="/" className="hover:underline">Dashboard</Link>
        <Link to="/leads" className="hover:underline">Leads</Link>
        <Link to="/opportunities" className="hover:underline">Opportunities</Link>
      </nav>
    </header>
  );
}
