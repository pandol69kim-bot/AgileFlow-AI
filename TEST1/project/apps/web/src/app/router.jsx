import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layout.jsx';
import { HomePage } from '../pages/HomePage.jsx';
import { PipelinePage } from '../pages/PipelinePage.jsx';
import { ProjectsPage } from '../pages/ProjectsPage.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'pipeline/:projectId', element: <PipelinePage /> },
      { path: 'projects', element: <ProjectsPage /> },
    ],
  },
]);
