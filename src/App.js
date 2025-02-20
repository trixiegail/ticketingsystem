import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Ticket from "./TicketStatus/Ticket";
import DashboardLayout from "./Dashboard/DashboardLayout";
import TicketContent from "./TicketStatus/TicketContent";
import Company from "./Company/Company";
import Assignees from "./Assignees/Assignees";
import TicketHistory from "./Company/TicketHistory";
// import Dashboard from "./Dashboard/Dashboard";
import Dashyboard from "./Dashboard/Dashboard";

function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Ticket />} />
              <Route path="/dashboard" element={<Dashyboard />} />
              <Route path="/all-tickets" element={<Ticket />} />
              <Route path="/all-tickets/:id" element={<TicketContent />} />
              <Route path="/dashboard" element={<DashboardLayout />} />
              <Route path="/company" element={<Company />} />
              <Route path="/assignees" element={<Assignees />} />
              <Route path="/ticket-history/:id" element={<TicketHistory />} />
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;