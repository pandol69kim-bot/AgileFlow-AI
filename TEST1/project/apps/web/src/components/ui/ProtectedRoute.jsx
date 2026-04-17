import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.jsx';

export function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-surface-base)' }}>
        <span className="text-slate-500 text-sm animate-pulse">Loading…</span>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return children;
}
