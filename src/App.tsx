import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import PatientList from './pages/PatientList';
import PatientView from './pages/PatientView';
import NotFound from './pages/NotFound';
import PatientFormPage from './pages/PatientFormPage';
import Analytics from './pages/Analytics';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  // ...existing code...

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/patients" element={<PatientList />} />
            <Route path="/patients/new" element={<PatientFormPage />} />
            <Route path="/patients/:id" element={<PatientView />} />
            <Route path="/patients/:id/edit" element={<PatientFormPage />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
