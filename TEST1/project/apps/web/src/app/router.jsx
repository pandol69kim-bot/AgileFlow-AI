import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout.jsx';
import { HomePage } from '../pages/HomePage.jsx';
import { PipelinePage } from '../pages/PipelinePage.jsx';
import { ProjectsPage } from '../pages/ProjectsPage.jsx';
import { LoginPage } from '../pages/LoginPage.jsx';
import { StatusPage } from '../pages/StatusPage.jsx';
import { ProtectedRoute } from '../components/ui/ProtectedRoute.jsx';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'pipeline/:projectId', element: <PipelinePage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'status', element: <StatusPage /> },
    ],
  },
]);
