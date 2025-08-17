import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./AppContext";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar title="Leads & Opportunities Dashboard" />
          <Header />
          <main className="flex-1 p-6 bg-gray-50">
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}
