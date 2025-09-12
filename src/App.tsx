import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import PatientList from './pages/PatientList';
import PatientView from './pages/PatientView';
import NotFound from './pages/NotFound';
import PatientFormPage from './pages/PatientFormPage';
import Analytics from './pages/Analytics';

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patients" element={<PatientList />} />
          <Route path="/patients/new" element={<PatientFormPage />} />
          <Route path="/patients/:id" element={<PatientView />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;
