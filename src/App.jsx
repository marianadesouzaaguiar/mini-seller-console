import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./AppContext";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import OpportunitiesPage from "./pages/OpportunitiesPage";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar title="Leads & Opportunities Panel" />
        <Header />
        <main className="flex-1 p-6 bg-gray-50 min-h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/opportunities" element={<OpportunitiesPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AppProvider>
  );
}
