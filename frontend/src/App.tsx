import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';

// Layout Components
import Layout from './components/layout/Layout';

// Auth Components
import Login from './components/auth/Login';

// Feature Components
import Dashboard from './components/dashboard/Dashboard';
import Cases from './components/cases/Cases';
import Documents from './components/documents/Documents';
import Appointments from './components/appointments/Appointments';
import Billing from './components/billing/Billing';
import Leaves from './components/leaves/Leaves';
import Reminders from './components/reminders/Reminders';
import Clients from './components/clients/Clients';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="cases/*" element={<Cases />} />
        <Route path="documents/*" element={<Documents />} />
        <Route path="appointments/*" element={<Appointments />} />
        <Route path="billing/*" element={<Billing />} />
        <Route path="leaves/*" element={<Leaves />} />
        <Route path="reminders/*" element={<Reminders />} />
        <Route path="clients/*" element={<Clients />} />
      </Route>
    </Routes>
  );
};

export default App; 