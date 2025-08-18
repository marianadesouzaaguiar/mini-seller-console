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

  // Filtragem Leads
  const filteredLeads = leads
    .filter(
      (lead) =>
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.company.toLowerCase().includes(search.toLowerCase())
    )
    .filter((lead) => (statusFilter ? lead.status.toLowerCase() === statusFilter.toLowerCase() : true))
    .sort((a, b) => (sortDesc ? b.score - a.score : a.score - b.score));

  // Filtragem Oportunidades
  const filteredOpportunities = opportunities.filter(
    (o) => !oppStatusFilter || o.stage.toLowerCase() === oppStatusFilter.toLowerCase()
  );

  // Cores CRM
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "new":
        return darkMode ? "bg-blue-600 text-white" : "bg-blue-200 text-blue-900";
      case "contacted":
        return darkMode ? "bg-yellow-500 text-black" : "bg-yellow-200 text-yellow-900";
      case "qualified":
        return darkMode ? "bg-green-600 text-white" : "bg-green-200 text-green-900";
      case "lost":
        return darkMode ? "bg-red-600 text-white" : "bg-red-200 text-red-900";
      default:
        return darkMode ? "bg-gray-600 text-white" : "bg-gray-200 text-gray-900";
    }
  };

  // Contraste das linhas
  const getRowBg = (index, dark) =>
    dark
      ? index % 2 === 0
        ? "bg-gray-900/80"
        : "bg-gray-800"
      : index % 2 === 0
      ? "bg-gray-50"
      : "bg-white";

  const getRowHover = (dark) => (dark ? "hover:bg-gray-700/70" : "hover:bg-gray-200/70");

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
    <div
      className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"} p-6 pt-24 min-h-screen transition-colors duration-500`}
    >
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`px-3 py-1 rounded-lg font-medium transition-colors duration-300 fixed top-6 right-6 z-50
          ${darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-300 text-gray-900 hover:bg-gray-400"}`}
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
          className={`border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 flex-1 min-w-[200px] transition-colors duration-500
            ${darkMode ? "bg-gray-800 text-gray-100 border-gray-700 placeholder-gray-400" : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"}`}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 transition-colors duration-500
            ${darkMode ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
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
          className={`border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 transition-colors duration-500
            ${darkMode ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
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
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Source</th>
              <th className="px-4 py-3 text-left">Score</th>
              <th className="px-4 py-3 text-left">Status</th>
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
                  <td className="px-4 py-2 max-w-[60px] truncate">{lead.id}</td>
                  <td className="px-4 py-2 max-w-[180px] truncate">{lead.name}</td>
                  <td className="px-4 py-2 max-w-[150px] truncate">{lead.company}</td>
                  <td className="px-4 py-2 max-w-[200px] truncate">{lead.email}</td>
                  <td className="px-4 py-2 max-w-[120px] truncate">{lead.source}</td>
                  <td className={`px-4 py-2 max-w-[80px] truncate ${lead.maxScore ? "text-yellow-400 font-bold flex items-center gap-1" : ""}`}>
                    {lead.score} {lead.maxScore && <FaTrophy />}
                  </td>
                  <td className={`px-4 py-2 text-center rounded-full max-w-[120px] truncate ${getStatusColor(lead.status)}`}>
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

        {/* Filter by Status */}
        <div className="flex gap-4 mb-4">
          <select
            value={oppStatusFilter}
            onChange={(e) => setOppStatusFilter(e.target.value)}
            className={`border px-4 py-2 rounded-lg shadow-sm transition-colors duration-500
              ${darkMode ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-300"}`}
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
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Stage</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Account</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredOpportunities.map((o, index) => (
                  <motion.tr
                    key={o.id}
                    className={`transition-all duration-200 border-b ${getRowBg(index, darkMode)} ${getRowHover(darkMode)}`}
                    variants={o.id === newOpportunityId ? { ...rowAnimation, visible: { ...rowAnimation.visible(index), backgroundColor: darkMode ? "#1f2937" : "#ffffff" } } : rowAnimation}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={index}
                    layout
                  >
                    <td className="px-4 py-2 max-w-[60px] truncate">{o.id}</td>
                    <td className="px-4 py-2 max-w-[180px] truncate">{o.name}</td>
                    <td className={`px-3 py-1 inline-block min-w-[70px] max-w-[120px] fonte-medium bg-clip-padding ${getStatusColor(o.stage)}`}>
                      {o.stage}
                    </td>
                    <td className="px-4 py-2 max-w-[100px] truncate">{o.amount || "-"}</td>
                    <td className="px-4 py-2 max-w-[150px] truncate">{o.accountName || "-"}</td>
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
