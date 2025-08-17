import React from "react";
import { AppProvider } from "./AppContext";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar title="Painel de Leads e Oportunidades" />
        <Header/>
        <main className="flex-1 p-6 bg-gray-50">
          <Dashboard />
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}
