// src/AppContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import leadsData from "./leads.json";

const AppContext = createContext();

const statusToStage = (status) => {
  switch (status.toLowerCase()) {
    case "new":
      return "Prospecting";
    case "contacted":
      return "Engaged";
    case "qualified":
      return "Negotiation";
    default:
      return status;
  }
};

export function AppProvider({ children }) {
  const [leads, setLeads] = useState(leadsData);
  const [opportunities, setOpportunities] = useState([]);

  const [selectedLead, setSelectedLead] = useState(null);
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("success");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortDesc, setSortDesc] = useState(true);

  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      // Adicionando a lógica de score aqui, no momento da atualização
      let finalLead = { ...updatedLead };
      if (finalLead.score > 100) {
        confetti({
          particleCount: 25,
          spread: 40,
          origin: { y: 0.3 },
          colors: ["#FFD700", "#FFC107", "#FFF59D"],
          scalar: 0.8,
        });
        finalLead.score = 100;
      }
      finalLead.maxScore = finalLead.score === 100;

      setLeads((prev) =>
        prev.map((lead) => (lead.id === finalLead.id ? finalLead : lead))
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

  const handleConvertToOpportunity = (lead) => {
    if (opportunities.some((o) => o.id === lead.id)) {
      setNotification("⚠️ This lead is already an opportunity!");
      setNotificationType("warning");
      return;
    }

    const newOpportunity = {
      id: lead.id,
      name: lead.name,
      stage: statusToStage(lead.status),
      amount: lead.score * 1000,
      accountName: lead.company,
    };

    setOpportunities((prev) => [...prev, newOpportunity]);
    setLeads((prevLeads) => prevLeads.filter((l) => l.id !== lead.id));
    setNotification("🎉 New Opportunity Created!");
    setNotificationType("success");

    confetti({
      particleCount: 25,
      spread: 40,
      origin: { y: 0.3 },
      colors: ["#FFD700", "#FFC107", "#FFF59D"],
      scalar: 0.8,
    });
  };

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
        setNotificationType, // LINHA CORRIGIDA
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