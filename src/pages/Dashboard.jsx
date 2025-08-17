import React, { useState } from "react";
import { useAppContext } from "../AppContext";
import LeadDetailPanel from "../components/LeadDetailPanel";
import Toast from "../components/Toast";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const {
    leads,
    loading,
    error,
    selectedLead,
    setSelectedLead,
    handleSaveLead,
    saving,
    saveError,
    opportunities,
    handleConvertToOpportunity,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortDesc,
    setSortDesc,
    notification,
    setNotification,
  } = useAppContext();

  const [darkMode, setDarkMode] = useState(true);

  const filteredLeads = leads
    .filter(
      (lead) =>
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.company.toLowerCase().includes(search.toLowerCase())
    )
    .filter((lead) => (statusFilter ? lead.status === statusFilter : true))
    .sort((a, b) => (sortDesc ? b.score - a.score : a.score - b.score));

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

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return darkMode ? "bg-blue-700 text-white" : "bg-blue-100 text-blue-800";
      case "Contacted":
        return darkMode ? "bg-indigo-700 text-white" : "bg-indigo-100 text-indigo-800";
      case "Qualified":
        return darkMode ? "bg-green-700 text-white" : "bg-green-100 text-green-800";
      case "Lost":
        return darkMode ? "bg-red-700 text-white" : "bg-red-100 text-red-800";
      default:
        return darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"} p-6 pt-24 min-h-screen transition-colors duration-500`}>
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-6 left-6 px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      {/* Toast */}
      <Toast message={notification} onClose={() => setNotification(null)} />

      {/* Header */}
      <h1 className="text-5xl font-bold mb-6">📊 Dashboard</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`${darkMode ? "bg-gray-800 text-gray-100 border-gray-700 placeholder-gray-400" : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"} border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 flex-1 min-w-[200px] transition-colors duration-500`}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={`${darkMode ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-300"} border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 transition-colors duration-500`}
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
          className={`${darkMode ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-300"} border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 transition-colors duration-500`}
        >
          <option value="desc">Score: High → Low</option>
          <option value="asc">Score: Low → High</option>
        </select>
      </div>

      {/* Leads Table */}
      <div className="overflow-x-auto mb-8">
        {loading && <p>Loading leads...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <table className={`min-w-full rounded-xl shadow-md overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"} transition-colors duration-500`}>
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
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedLead?.id === lead.id ? "shadow-lg animate-pulse" : "hover:scale-102"
                    }`}
                    onClick={() => setSelectedLead(lead)}
                    variants={rowAnimation}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={index}
                    layout
                  >
                    <td className="px-4 py-2">{lead.id}</td>
                    <td className="px-4 py-2">{lead.name}</td>
                    <td className="px-4 py-2">{lead.company}</td>
                    <td className="px-4 py-2">{lead.email}</td>
                    <td className="px-4 py-2">{lead.source}</td>
                    <td className="px-4 py-2">{lead.score}</td>
                    <td className={`px-4 py-2 rounded-full text-center ${getStatusColor(lead.status)} transition-colors duration-500`}>
                      {lead.status}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        )}
      </div>

      {/* Slide-over */}
      {selectedLead && (
        <LeadDetailPanel
          lead={selectedLead}
          onSave={handleSaveLead}
          saving={saving}
          error={saveError}
          onClose={() => setSelectedLead(null)}
          onConvert={() => {
            handleConvertToOpportunity(selectedLead);
            setSelectedLead(null);
          }}
        />
      )}

      {/* Opportunities Table */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-green-400">💼 Opportunities</h2>
        {opportunities.length === 0 ? (
          <p className="italic text-gray-400">No opportunities available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className={`min-w-full rounded-xl shadow-md overflow-hidden ${darkMode ? "bg-gray-800" : "bg-white"} transition-colors duration-500`}>
              <thead className={`${darkMode ? "bg-gray-700 text-gray-100" : "bg-green-100 text-green-800"}`}>
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Stage</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">Account</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {opportunities.map((o, index) => (
                    <motion.tr
                      key={o.id}
                      className="transition-all duration-200 hover:scale-102 cursor-pointer"
                      variants={rowAnimation}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      custom={index}
                      layout
                    >
                      <td className="px-4 py-2">{o.name}</td>
                      <td className="px-4 py-2">{o.stage}</td>
                      <td className="px-4 py-2">{o.amount || "-"}</td>
                      <td className="px-4 py-2">{o.accountName || "-"}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-6 text-lg font-medium text-green-400">
        Keep track of your opportunities here. Only unique leads can be converted.
      </div>
    </div>
  );
}
