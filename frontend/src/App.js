import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Cases from './pages/Cases';
import Documents from './pages/Documents';
import Appointments from './pages/Appointments';
import Billing from './pages/Billing';
import Leaves from './pages/Leaves';
import Clients from './pages/Clients';
import Login from './pages/Login';

// Context
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="cases" element={<Cases />} />
              <Route path="documents" element={<Documents />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="billing" element={<Billing />} />
              <Route path="leaves" element={<Leaves />} />
              <Route path="clients" element={<Clients />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Router>
    </AuthProvider>
  );
}

export default App; 