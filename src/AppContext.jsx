import React, { createContext, useContext, useState, useEffect } from "react";
import leadsData from "./leads.json";
import { saveLeadPatch } from "./api";
import Confetti from "react-confetti";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [search, setSearch] = useState(localStorage.getItem("search") || "");
  const [statusFilter, setStatusFilter] = useState(localStorage.getItem("statusFilter") || "");
  const [sortDesc, setSortDesc] = useState(localStorage.getItem("sortDesc") !== "false");
  const [notification, setNotification] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Simulando fetch de leads
    setLoading(true);
    setTimeout(() => {
      setLeads(leadsData);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    localStorage.setItem("search", search);
    localStorage.setItem("statusFilter", statusFilter);
    localStorage.setItem("sortDesc", sortDesc);
  }, [search, statusFilter, sortDesc]);

  const handleSaveLead = async (patch) => {
    if (!selectedLead) return;
    setSaving(true);
    const original = { ...selectedLead };
    setLeads((prev) =>
      prev.map((l) => (l.id === selectedLead.id ? { ...l, ...patch } : l))
    );
    try {
      await saveLeadPatch(selectedLead.id, patch);
      setSelectedLead((prev) => ({ ...prev, ...patch }));
      setNotification("Lead saved successfully!");
    } catch (err) {
      setLeads((prev) =>
        prev.map((l) => (l.id === selectedLead.id ? original : l))
      );
      setSaveError(err.message || "Failed to save lead");
      setNotification("Error saving lead!");
    } finally {
      setSaving(false);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const handleConvertToOpportunity = (lead) => {
    // Evita duplicação
    if (opportunities.find((o) => o.name === lead.name && o.accountName === lead.company)) {
      setNotification("Opportunity already exists!");
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    const newOpp = {
      id: "O-" + Date.now(),
      name: lead.name,
      stage: lead.status,
      amount: lead.score * 1000,
      accountName: lead.company,
    };

    setOpportunities((prev) => [newOpp, ...prev]);
    setNotification("Opportunity created!");
    setShowConfetti(true);

    setTimeout(() => setShowConfetti(false), 3000);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <AppContext.Provider
      value={{
        leads,
        opportunities,
        selectedLead,
        setSelectedLead,
        handleSaveLead,
        handleConvertToOpportunity,
        saving,
        saveError,
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        sortDesc,
        setSortDesc,
        loading,
        notification,
        setNotification,
      }}
    >
      {children}
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
