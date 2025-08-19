import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrophy } from "react-icons/fa";

export default function LeadTable({
  leads = [],
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  sortDesc,
  setSortDesc,
  darkMode,
  getStatusColor,
  getRowBg,
  getRowHover,
  rowAnimation,
  selectedLead,
  setSelectedLead,
  handleConvert,
  handleSaveLead,
  saving,
  saveError,
  newOpportunityId,
}) {
  const filteredLeads = leads
    .filter((lead) => {
      const name = lead.name || "";
      const company = lead.company || "";
      return (
        name.toLowerCase().includes(search.toLowerCase()) ||
        company.toLowerCase().includes(search.toLowerCase())
      );
    })
    .filter((lead) =>
      statusFilter ? (lead.status || "").toLowerCase() === statusFilter.toLowerCase() : true
    )
    .sort((a, b) => (sortDesc ? (b.score || 0) - (a.score || 0) : (a.score || 0) - (b.score || 0)));

  return (
    <div className="overflow-x-auto w-full mb-8">
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 flex-1 min-w-[200px] transition-colors duration-500 ${
            darkMode ? "bg-gray-800 text-gray-100 border-gray-700 placeholder-gray-400" : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
          }`}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 transition-colors duration-500 ${
            darkMode ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-300"
          }`}
        >
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>
        <select
          value={sortDesc ? "desc" : "asc"}
          onChange={(e) => setSortDesc(e.target.value === "desc")}
          className={`border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 transition-colors duration-500 ${
            darkMode ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-300"
          }`}
        >
          <option value="desc">Score: High → Low</option>
          <option value="asc">Score: Low → High</option>
        </select>
      </div>

      <table
        className={`min-w-full table-auto rounded-xl shadow-md ${darkMode ? "bg-gray-800" : "bg-white"} transition-colors duration-500`}
      >
        <thead className={`${darkMode ? "bg-gray-700 text-gray-100" : "bg-indigo-100 text-indigo-800"}`}>
          <tr>
            <th className="px-4 py-1.5 text-left">ID</th>
            <th className="px-4 py-1.5 text-left">Name</th>
            <th className="px-4 py-1.5 text-left">Company</th>
            <th className="px-4 py-1.5 text-left">Email</th>
            <th className="px-4 py-1.5 text-left">Source</th>
            <th className="px-2 py-1.5 text-left">Score</th>
            <th className="px-3 py-1.5 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {filteredLeads.map((lead, index) => (
              <motion.tr
                key={lead.id}
                className={`cursor-pointer transition-all duration-200 border-b ${getRowBg(index, darkMode)} ${getRowHover(darkMode)}`}
                onClick={() => setSelectedLead(lead)}
                variants={rowAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={index}
                layout
              >
                <td className="px-4 py-1.5">{lead.id || "-"}</td>
                <td className="px-4 py-1.5">{lead.name || "-"}</td>
                <td className="px-4 py-1.5">{lead.company || "-"}</td>
                <td className="px-4 py-1.5">{lead.email || "-"}</td>
                <td className="px-4 py-1.5">{lead.source || "-"}</td>
                <td className="px-2 py-1 text-xs">
                  <div className="flex items-center gap-1">
                    <span>{lead.score || 0}</span>
                    {lead.maxScore && (
                      <motion.span
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
                        className="text-yellow-400"
                      >
                        <FaTrophy />
                      </motion.span>
                    )}
                  </div>
                </td>
                <td className={`px-3 py-1 min-w-[70px] text-center rounded-full inline-block font-medium text-xs ${getStatusColor(lead.status)}`}>
                  {lead.status || "-"}
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
