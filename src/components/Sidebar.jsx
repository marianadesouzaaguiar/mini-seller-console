import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ open, setOpen }) {
  return (
    <aside
      className={`bg-gray-800 text-white w-64 p-4 space-y-4
                  fixed inset-y-0 left-0 transform ${open ? 'translate-x-0' : '-translate-x-full'}
                  transition-transform duration-300 md:relative md:translate-x-0`}
    >
      <nav className="flex flex-col space-y-2">
        <Link to="/" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link to="/login" className="hover:bg-gray-700 p-2 rounded">Login</Link>
      </nav>
    </aside>
  );
}
