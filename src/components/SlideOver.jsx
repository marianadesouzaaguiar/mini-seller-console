// src/components/SlideOver.jsx
import React from "react";

export default function SlideOver({ open, title, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        onClick={onClose}
      ></div>

      {/* Panel */}
      <div className="ml-auto w-full sm:w-96 bg-white shadow-xl p-6 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
}
