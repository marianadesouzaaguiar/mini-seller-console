import React, { createContext, useContext, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import leadsData from "./leads.json";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [leads, setLeads] = useState(leadsData);
  const [opportunities, setOpportunities] = useState([]);

  const [selectedLead, setSelectedLead] = useState(null);
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("success"); // success, error, warning
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortDesc, setSortDesc] = useState(true);

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Limpa notification automaticamente
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Salvar lead editado
  const handleSaveLead = (updatedLead) => {
    setSaving(true);
    try {
      setLeads((prev) =>
        prev.map((lead) => (lead.id === updatedLead.id ? { ...updatedLead } : lead))
      );
      setNotification("✅ Lead saved successfully!");
      setNotificationType("success");
      setSaving(false);
    } catch (err) {
      setSaveError("❌ Failed to save lead.");
      setNotification("❌ Failed to save lead.");
      setNotificationType("error");
      setSaving(false);
    }
  };

  // Converter lead em oportunidade
  const handleConvertToOpportunity = (lead) => {
    if (opportunities.some((o) => o.id === lead.id)) {
      setNotification("⚠️ This lead is already an opportunity!");
      setNotificationType("warning");
      return;
    }

    const newOpportunity = {
      id: lead.id,
      name: lead.name,
      stage: lead.status,
      amount: lead.score * 1000, 
      accountName: lead.company,
    };

    setOpportunities((prev) => [...prev, newOpportunity]);
    setNotification("🎉 New Opportunity Created!");
    setNotificationType("success");

    // Confetti discreto
    confetti({
      particleCount: 25,
      spread: 40,
      origin: { y: 0.3 },
      colors: ["#FFD700", "#FFC107", "#FFF59D"],
      scalar: 0.8,
    });
  };

  // Limite de score a 100 e destaque visual
  useEffect(() => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) => {
        if (lead.score > 100) {
          confetti({
            particleCount: 25,
            spread: 40,
            origin: { y: 0.3 },
            colors: ["#FFD700", "#FFC107", "#FFF59D"],
            scalar: 0.8,
          });
          return { ...lead, score: 100, maxScore: true };
        }
        return { ...lead, maxScore: lead.score === 100 };
      })
    );
  }, [leads]);

  return (
    <AppContext.Provider
      value={{
        leads,
        opportunities,
        selectedLead,
        setSelectedLead,
        handleSaveLead,
        saving,
        saveError,
        loading,
        error,
        handleConvertToOpportunity,
        notification,
        setNotification,
        notificationType,
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        sortDesc,
        setSortDesc,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}