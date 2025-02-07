import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Ticket from "./TicketStatus/Ticket";
import DashboardLayout from "./Dashboard/DashboardLayout";
import ScheduledTicket from "./Dashboard/ScheduledTicket";
import CompletedTicket from "./TicketStatus/CompletedTicket";
import TicketContent from "./TicketStatus/TicketContent";
import Company from "./Company/Company";
import Assignees from "./Assignees/Assignees";


function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Ticket />} />
              <Route path="/all-tickets" element={<Ticket />} />
              <Route path="/dashboard" element={<DashboardLayout />} />
              <Route path="/company" element={<Company />} />
              <Route path="/assignees" element={<Assignees />} />
              <Route path="/scheduled-ticket" element={<ScheduledTicket/>} />
              <Route path="/completed-ticket" element={<CompletedTicket/>} />
              <Route path="/ticket-content" element={<TicketContent/>} />
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;