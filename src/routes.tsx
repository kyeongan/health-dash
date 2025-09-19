import type { RouteObject } from 'react-router-dom';

import Home from './pages/Home';
import PatientList from './pages/PatientList';
import PatientListScroll from './pages/PatientListScroll';
import PatientView from './pages/PatientView';
import PatientFormPage from './pages/PatientFormPage';
import NotFound from './pages/NotFound';

export const routes: RouteObject[] = [
  { path: '/', element: <Home /> },
  { path: '/patients', element: <PatientList /> },
  { path: '/patients-scroll', element: <PatientListScroll /> },
  { path: '/patients/:id', element: <PatientView /> },
  { path: '/patients/:id/edit', element: <PatientFormPage /> },
  { path: '*', element: <NotFound /> },
];
