import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function LeadDetailPanel({ lead, onSave, saving, error, onClose, onConvert, darkMode, onAttemptConvertLost }) {
  // Estado local para gerenciar as alterações no lead.
  const [patch, setPatch] = useState({ ...lead });
  // Estado para exibir erros de validação locais.
  const [localError, setLocalError] = useState("");

  // Determine se o lead está no estado "Lost" (Perdido).
  const isLost = lead?.status?.toLowerCase() === "lost";

  useEffect(() => {
    // Redefine o estado local quando o lead selecionado muda.
    if (lead) {
      setPatch({ ...lead });
      setLocalError("");
    }
  }, [lead]);

  // Lida com as mudanças nos campos de entrada e atualiza o estado local.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatch((prev) => ({ ...prev, [name]: value }));
  };

  // Valida o formato do e-mail usando uma expressão regular.
  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  // Valida se todos os campos obrigatórios estão preenchidos.
  const validateAll = () => {
    const requiredFields = ["name", "company", "email", "source", "score", "status"];
    
    // Verifica se algum campo obrigatório está vazio.
    for (const key of requiredFields) {
      if (!patch[key] || patch[key].toString().trim() === "") {
        setLocalError(`${key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty`);
        return false;
      }
    }
    
    // Valida o formato do e-mail.
    if (!validateEmail(patch.email)) {
      setLocalError("Please enter a valid email address.");
      return false;
    }
    
    setLocalError("");
    return true;
  };

  // Lida com o clique no botão "Save" (Salvar).
  const handleSaveClick = async () => {
    if (!validateAll()) return;
    await onSave(patch);
    onClose();
  };

  // Lida com o clique no botão "Convert" (Converter).
  const handleConvertClick = async () => {
    // Verificamos primeiro se o lead é "Lost"
    if (isLost) {
      setLocalError("⚠️ You can't convert a 'Lost' lead to an opportunity. Please change the status first.");
      // Chamamos a função do componente pai para mostrar o toast e fechar o painel
      onAttemptConvertLost();
      return; 
    }

    if (!validateAll()) return;
    await onConvert(patch);
  };

  // Classes de estilo para o modo escuro e claro.
  const panelBg = darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900";
  const inputBg = darkMode ? "bg-gray-800 text-gray-100 border-gray-700" : "bg-gray-100 text-gray-900 border-gray-300";
  const disabledBg = darkMode ? "bg-gray-700 text-gray-400 cursor-not-allowed" : "bg-gray-200 text-gray-500 cursor-not-allowed";

  return (
    <motion.div
      className="fixed inset-0 z-50 flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>

      <motion.div
        className={`relative w-full max-w-md h-full shadow-xl overflow-y-auto ${panelBg} transition-colors duration-500`}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-700">
          <h2 className="text-2xl font-semibold">Lead Details</h2>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-700 transition">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="px-6 py-4 space-y-4">
          {(error || localError) && (
            <p className="text-red-500 text-sm font-medium">{error || localError}</p>
          )}

          {["name", "company", "email", "source", "score"].map((field) => (
            <div className="flex flex-col space-y-2" key={field}>
              <label className="capitalize text-sm font-medium">{field}</label>
              <input
                type={field === "email" ? "email" : field === "score" ? "number" : "text"}
                name={field}
                value={patch[field] || ""}
                onChange={handleChange}
                disabled={isLost && field === 'score'}
                className={`border px-3 py-2 rounded ${isLost && field === 'score' ? disabledBg : inputBg} transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
            </div>
          ))}

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Status</label>
            <select
              name="status"
              value={patch.status}
              onChange={handleChange}
              disabled={false}
              className={`border px-3 py-2 rounded ${inputBg} transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
        </div>

        <div className="px-6 py-4 flex justify-end space-x-3 border-t border-gray-700">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-400 text-white px-4 py-2 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConvertClick}
            className={`px-4 py-2 rounded-lg transition ${isLost ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-500 text-white"}`}
          >
            Convert
          </button>
          <button
            onClick={handleSaveClick}
            disabled={saving}
            className={`px-4 py-2 rounded-lg transition ${saving ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 text-white"}`}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
