// src/pages/LeadsPage.jsx
import React, { useEffect, useState } from "react";
import leadsData from "../data/leads.json";
import LeadDetailPanel from "../components/LeadDetailPanel";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    setLeads(leadsData);
  }, []);

  // Filtro e busca
  const filteredLeads = leads
    .filter((lead) =>
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.company.toLowerCase().includes(search.toLowerCase())
    )
    .filter((lead) =>
      statusFilter ? lead.status === statusFilter : true
    )
    .sort((a, b) =>
      sortOrder === "desc" ? b.score - a.score : a.score - b.score
    );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Leads</h1>

      {/* Filtros */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Buscar por nome ou empresa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded w-1/3"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="">Todos os status</option>
          <option value="Novo">Novo</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Qualificado">Qualificado</option>
          <option value="Perdido">Perdido</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="desc">Score: Maior → Menor</option>
          <option value="asc">Score: Menor → Maior</option>
        </select>
      </div>

      {/* Lista de Leads */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Nome</th>
            <th className="border px-2 py-1">Empresa</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Score</th>
            <th className="border px-2 py-1"></th>
          </tr>
        </thead>
        <tbody>
          {filteredLeads.map((lead) => (
            <tr key={lead.id} className="hover:bg-gray-50">
              <td className="border px-2 py-1">{lead.name}</td>
              <td className="border px-2 py-1">{lead.company}</td>
              <td className="border px-2 py-1">{lead.status}</td>
              <td className="border px-2 py-1">{lead.score}</td>
              <td className="border px-2 py-1 text-right">
                <button
                  onClick={() => setSelectedLead(lead)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Painel de Detalhes */}
      {selectedLead && (
        <LeadDetailPanel
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
}
