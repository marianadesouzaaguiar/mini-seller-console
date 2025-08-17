// src/components/Navbar.js
import React from "react";

export default function Navbar() {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Mini Seller Console</h1>
      <nav className="space-x-4">
        <a href="/" className="text-gray-600 hover:text-gray-900">Dashboard</a>
        <a href="/opportunities" className="text-gray-600 hover:text-gray-900">Opportunities</a>
      </nav>
    </header>
  );
}
