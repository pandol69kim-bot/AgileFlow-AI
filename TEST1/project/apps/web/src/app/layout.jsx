import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';

export function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-surface-base)' }}>
      <header
        className="sticky top-0 z-50 border-b px-6 py-3 flex items-center justify-between backdrop-blur-md"
        style={{ borderColor: 'var(--color-surface-border)', backgroundColor: 'rgba(10,10,15,0.8)' }}
      >
        <Link to="/" className="flex items-center gap-2 font-semibold text-slate-100 hover:text-primary-400 transition-colors">
          <span className="text-primary-400">✦</span> AgileFlow
        </Link>
        <nav className="flex items-center gap-6 text-sm text-slate-400">
          <Link to="/projects" className="hover:text-slate-200 transition-colors">Projects</Link>
          <Link to="/status" className="hover:text-slate-200 transition-colors">Status</Link>
          {user && (
            <button
              type="button"
              onClick={logout}
              className="hover:text-slate-200 transition-colors"
            >
              {user.name} · 로그아웃
            </button>
          )}
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
