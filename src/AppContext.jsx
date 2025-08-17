import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchLeads, saveLeadPatch } from "./api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [leads, setLeads] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [notification, setNotification] = useState("");
  const [search, setSearch] = useState(localStorage.getItem("search") || "");
  const [statusFilter, setStatusFilter] = useState(
    localStorage.getItem("statusFilter") || ""
  );
  const [sortDesc, setSortDesc] = useState(
    localStorage.getItem("sortDesc") === "false" ? false : true
  );

  useEffect(() => {
    fetchLeads()
      .then(setLeads)
      .catch((err) => {
        setSaveError(err.message);
        setNotification(`❌ ${err.message}`);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem("search", search);
    localStorage.setItem("statusFilter", statusFilter);
    localStorage.setItem("sortDesc", sortDesc);
  }, [search, statusFilter, sortDesc]);

  const showNotification = (message) => setNotification(message);

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
      showNotification(`✅ Lead salvo com sucesso!`);
    } catch (err) {
      setLeads((prev) =>
        prev.map((l) => (l.id === selectedLead.id ? original : l))
      );
      const msg = err.message || "Falha ao salvar lead";
      setSaveError(msg);
      showNotification(`❌ ${msg}`);
    } finally {
      setSaving(false);
    }
  };

  const handleConvertToOpportunity = (lead) => {
    const exists = opportunities.some(
      (o) => o.accountName === lead.company && o.name === lead.name
    );
    if (exists) {
      showNotification(`⚠️ Oportunidade já existe para ${lead.name}`);
      return;
    }
    const newOpp = {
      id: "O-" + Date.now(),
      name: lead.name,
      stage: lead.status,
      amount: "",
      accountName: lead.company,
    };
    setOpportunities((prev) => [newOpp, ...prev]);
    showNotification(`✅ Oportunidade criada para ${lead.name}`);
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
        showNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
