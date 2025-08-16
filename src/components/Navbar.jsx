import React from 'react';

export default function Navbar({ setSidebarOpen }) {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <button
        className="md:hidden p-2 rounded bg-gray-200"
        onClick={() => setSidebarOpen(prev => !prev)}
      >
        ☰
      </button>
      <h1 className="text-xl font-bold">Mini Seller Console</h1>
    </header>
  );
}
