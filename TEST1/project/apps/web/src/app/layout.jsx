import { Outlet, Link, useNavigate } from 'react-router-dom';

export function AppLayout() {
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
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
