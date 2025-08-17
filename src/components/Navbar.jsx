import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ title }) {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">Dashboard</Link>
        <Link to="/opportunities" className="hover:underline">Opportunities</Link>
      </div>
    </nav>
  );
}
