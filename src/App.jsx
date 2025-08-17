import React, { createContext, useContext, useState, useEffect } from "react";
import leadsData from "./leads.json";
import { saveLeadPatch } from "./api"; // se não tiver, você pode mockar

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    setLeads(leadsData);
    setLoading(false);
  }, []);

  const handleSaveLead = async (patch) => {
    if (!selectedLead) return;
    setSaving(true);
    const original = { ...selectedLead };
    setLeads((prev) =>
      prev.map((l) => (l.id === selectedLead.id ? { ...l, ...patch } : l))
    );
    try {
      await saveLeadPatch?.(selectedLead.id, patch); // opcional
      setSelectedLead((prev) => ({ ...prev, ...patch }));
    } catch (err) {
      setLeads((prev) =>
        prev.map((l) => (l.id === selectedLead.id ? original : l))
      );
      setSaveError(err?.message || "Failed to save lead");
    } finally {
      setSaving(false);
    }
  };

  const handleConvertToOpportunity = (lead) => {
    const exists = opportunities.some((o) => o.name === lead.name);
    if (exists) return "exists";

    const newOpp = {
      id: "O-" + Date.now(),
      name: lead.name,
      stage: lead.status,
      amount: lead.score * 1000,
      accountName: lead.company,
    };
    setOpportunities((prev) => [newOpp, ...prev]);
    return "created";
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
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
