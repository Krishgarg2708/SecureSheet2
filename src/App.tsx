import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useUIStore } from './store/uiStore';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SpreadsheetPage from './pages/SpreadsheetPage';
import TemplatesPage from './pages/TemplatesPage';
import NotificationsPage from './pages/NotificationsPage';
import ActivityHistoryPage from './pages/ActivityHistoryPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

import AppLayout from './layouts/AppLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

export default function App() {
  const hydrateAuth = useAuthStore((s) => s.hydrate);
  const hydrateUI = useUIStore((s) => s.hydrate);

  useEffect(() => {
    hydrateAuth();
    hydrateUI();
  }, [hydrateAuth, hydrateUI]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="workspace" element={<SpreadsheetPage />} />
          <Route path="templates" element={<TemplatesPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="activity" element={<ActivityHistoryPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
