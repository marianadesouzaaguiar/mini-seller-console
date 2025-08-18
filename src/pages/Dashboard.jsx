import React, { useState, useRef } from "react";
import { useAppContext } from "../AppContext";
import LeadDetailPanel from "../components/LeadDetailPanel";
import Toast from "../components/Toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrophy } from "react-icons/fa";

export default function Dashboard() {
  const {
    leads,
    opportunities,
    selectedLead,
    setSelectedLead,
    handleSaveLead,
    saving,
    saveError,
    handleConvertToOpportunity,
    notification,
    notificationType,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortDesc,
    setSortDesc,
    setNotification,
  } = useAppContext();

  const [darkMode, setDarkMode] = useState(true);
  const [newOpportunityId, setNewOpportunityId] = useState(null);
  const [oppStatusFilter, setOppStatusFilter] = useState("");
  const opportunitiesRef = useRef(null);

  const filteredLeads = leads
    .filter(
      (lead) =>
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.company.toLowerCase().includes(search.toLowerCase())
    )
    .filter((lead) =>
      statusFilter
        ? lead.status.toLowerCase() === statusFilter.toLowerCase()
        : true
    )
    .sort((a, b) => (sortDesc ? b.score - a.score : a.score - b.score));

  const filteredOpportunities = opportunities.filter(
    (o) =>
      !oppStatusFilter ||
      o.stage.toLowerCase() === oppStatusFilter.toLowerCase()
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "new":
        return darkMode
          ? "text-blue-400 border border-blue-400"
          : "bg-blue-100 text-blue-800 border border-blue-300";
      case "contacted":
        return darkMode
          ? "text-yellow-400 border border-yellow-400"
          : "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "qualified":
        return darkMode
          ? "text-green-400 border border-green-400"
          : "bg-green-100 text-green-800 border border-green-300";
      case "lost":
        return darkMode
          ? "text-red-400 border border-red-400"
          : "bg-red-100 text-red-800 border border-red-300";
      default:
        return darkMode
          ? "text-gray-400 border border-gray-500"
          : "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  const getRowBg = (index, dark) =>
    dark
      ? index % 2 === 0
        ? "bg-gray-900/80"
        : "bg-gray-800"
      : index % 2 === 0
      ? "bg-gray-50"
      : "bg-white";

  const getRowHover = (dark) =>
    dark ? "hover:bg-gray-700/70" : "hover:bg-gray-200/70";

  const rowAnimation = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.05, type: "spring", stiffness: 300, damping: 25 },
    }),
    exit: { opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.2 } },
  };

  const handleConvert = (lead) => {
    handleConvertToOpportunity(lead);
    setSelectedLead(null);
    opportunitiesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setNewOpportunityId(lead.id);
    setTimeout(() => setNewOpportunityId(null), 1500);
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"} p-6 pt-24 min-h-screen transition-colors duration-500`}>
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`px-3 py-1 rounded-lg font-medium transition-colors duration-300 fixed top-6 right-6 z-50 ${darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-300 text-gray-900 hover:bg-gray-400"}`}
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      {/* Toast */}
      <Toast message={notification} type={notificationType} onClose={() => setNotification(null)} />

      {/* Header */}
      <h1 className="text-5xl font-bold mb-6">📊 Dashboard</h1>

      {/* Filters Leads */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 flex-1 min-w-[200px] transition-colors duration-500 ${darkMode ? "bg-gray-800 text-gray-100 border-gray-700 placeholder-gray-400" : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"}`}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 transition-colors duration-500 ${darkMode ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
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
          className={`border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 transition-colors duration-500 ${darkMode ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
        >
          <option value="desc">Score: High → Low</option>
          <option value="asc">Score: Low → High</option>
        </select>
      </div>

      {/* Leads Table */}
      <div className="overflow-x-auto w-full mb-8">
        <table className={`min-w-full table-auto rounded-xl shadow-md ${darkMode ? "bg-gray-800" : "bg-white"} transition-colors duration-500`}>
          <thead className={`${darkMode ? "bg-gray-700 text-gray-100" : "bg-indigo-100 text-indigo-800"}`}>
            <tr>
              <th className="px-4 py-1.5 text-left">ID</th>
              <th className="px-4 py-1.5 text-left">Name</th>
              <th className="px-4 py-1.5 text-left">Company</th>
              <th className="px-4 py-1.5 text-left">Email</th>
              <th className="px-4 py-1.5 text-left">Source</th>
              <th className="px-1.75 py-1.5 text-left">Score</th>
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
                  <td className="px-4 py-1.5 max-w-[60px] truncate">{lead.id}</td>
                  <td className="px-4 py-1.5 max-w-[180px] truncate">{lead.name}</td>
                  <td className="px-4 py-1.5 max-w-[150px] truncate">{lead.company}</td>
                  <td className="px-4 py-1.5 max-w-[200px] truncate">{lead.email}</td>
                  <td className="px-4 py-1.5 max-w-[120px] truncate">{lead.source}</td>

                  {/* Score centralizado com troféu */}
                  <td className="px-2 py-1 max-w-[60px] text-xs">
                    <div className="flex items-center justify-start gap-1">
                      <span >{lead.score}</span>
                      {lead.maxScore && (
                        <motion.span
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1 }}
                          className="text-yellow-400 inline-block"
                        >
                          <FaTrophy />
                        </motion.span>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className={`px-3 py-1 min-w-[70px] text-center rounded-full inline-block font-medium text-xs ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {selectedLead && (
        <LeadDetailPanel
          lead={selectedLead}
          onSave={handleSaveLead}
          saving={saving}
          error={saveError}
          onClose={() => setSelectedLead(null)}
          onConvert={() => handleConvert(selectedLead)}
        />
      )}

      {/* Opportunities Section */}
      <div ref={opportunitiesRef} className="overflow-x-auto w-full mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-green-400">💼 Opportunities</h2>
        <div className="flex gap-4 mb-4">
          <select
            value={oppStatusFilter}
            onChange={(e) => setOppStatusFilter(e.target.value)}
            className={`border px-4 py-2 rounded-lg shadow-sm transition-colors duration-500 ${darkMode ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
          >
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        {filteredOpportunities.length === 0 ? (
          <p className="italic text-gray-400">No opportunities available.</p>
        ) : (
          <table className={`min-w-full table-auto rounded-xl shadow-md ${darkMode ? "bg-gray-800" : "bg-white"} transition-colors duration-500`}>
            <thead className={`${darkMode ? "bg-gray-700 text-gray-100" : "bg-green-100 text-green-800"}`}>
              <tr>
                <th className="px-4 py-1.5 text-left">ID</th>
                <th className="px-4 py-1.5 text-left">Name</th>
                <th className="px-4 py-1.5 text-left">Stage</th>
                <th className="px-4 py-1.5 text-left">Amount</th>
                <th className="px-4 py-1.5 text-left">Account</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredOpportunities.map((o, index) => (
                  <motion.tr
                    key={o.id}
                    className={`transition-all duration-200 border-b ${getRowBg(index, darkMode)} ${getRowHover(darkMode)}`}
                    variants={rowAnimation}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={index}
                    layout
                  >
                    <td className="px-4 py-1.5 max-w-[60px] truncate">{o.id}</td>
                    <td className="px-4 py-1.5 max-w-[180px] truncate">{o.name}</td>
                    <td className={`px-3 py-1 min-w-[70px] text-center rounded-full inline-block font-medium text-xs ${getStatusColor(o.stage)}`}>
                      {o.stage}
                    </td>
                    <td className="px-4 py-1.5 max-w-[100px] truncate">{o.amount || "-"}</td>
                    <td className="px-4 py-1.5 max-w-[150px] truncate">{o.accountName || "-"}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-6 text-lg font-medium text-green-400">
        📌 Keep track of your opportunities here. Only unique leads can be converted.
      </div>
    </div>
  );
}
