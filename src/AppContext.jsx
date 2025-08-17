import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchLeads, saveLeadPatch } from "./api";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [opportunities, setOpportunities] = useState([]);

  useEffect(() => {
    fetchLeads()
      .then(setLeads)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSaveLead = async (patch) => {
    if (!selectedLead) return;
    setSaving(true);
    setSaveError("");
    const original = { ...selectedLead };

    setLeads((prev) =>
      prev.map((l) => (l.id === selectedLead.id ? { ...l, ...patch } : l))
    );

    try {
      await saveLeadPatch(selectedLead.id, patch);
      setSelectedLead((prev) => ({ ...prev, ...patch }));
    } catch (err) {
      setLeads((prev) =>
        prev.map((l) => (l.id === selectedLead.id ? original : l))
      );
      setSaveError(err.message || "Failed to save lead");
    } finally {
      setSaving(false);
    }
  };

  const handleConvertToOpportunity = (lead) => {
    const newOpp = {
      id: "O-" + Math.floor(Math.random() * 10000),
      name: lead.name,
      stage: lead.status,
      amount: "",
      accountName: lead.company,
    };
    setOpportunities((prev) => [newOpp, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        leads,
        loading,
        error,
        selectedLead,
        setSelectedLead,
        saving,
        saveError,
        handleSaveLead,
        opportunities,
        handleConvertToOpportunity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be inside AppProvider");
  return context;
}
