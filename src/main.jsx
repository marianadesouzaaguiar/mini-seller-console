// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./AppContext";

import Dashboard from "./pages/Dashboard";
import OpportunitiesPage from "./pages/OpportunitiesPage.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/opportunities" element={<OpportunitiesPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);
