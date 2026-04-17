import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { Button } from '../components/ui/Button.jsx';

export function LoginPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ email: '', name: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await register(form.email, form.name, form.password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: 'var(--color-surface-base)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2" style={{ color: 'var(--color-primary-400)' }}>✦</div>
          <h1 className="text-2xl font-bold text-slate-100">AgileFlow</h1>
          <p className="text-slate-500 text-sm mt-1">{mode === 'login' ? '로그인' : '계정 만들기'}</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border p-6 flex flex-col gap-4"
          style={{ borderColor: 'var(--color-surface-border)', backgroundColor: 'var(--color-surface-raised)' }}
        >
          <div>
            <label className="block text-xs text-slate-400 mb-1">이메일</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={set('email')}
              className="w-full rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1"
              style={{ backgroundColor: 'var(--color-surface-overlay)', border: '1px solid var(--color-surface-border)' }}
            />
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-xs text-slate-400 mb-1">이름</label>
              <input
                type="text"
                required
                minLength={2}
                value={form.name}
                onChange={set('name')}
                className="w-full rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1"
                style={{ backgroundColor: 'var(--color-surface-overlay)', border: '1px solid var(--color-surface-border)' }}
              />
            </div>
          )}

          <div>
            <label className="block text-xs text-slate-400 mb-1">비밀번호</label>
            <input
              type="password"
              required
              minLength={8}
              value={form.password}
              onChange={set('password')}
              className="w-full rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:ring-1"
              style={{ backgroundColor: 'var(--color-surface-overlay)', border: '1px solid var(--color-surface-border)' }}
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <Button type="submit" isLoading={loading} className="w-full justify-center">
            {mode === 'login' ? '로그인' : '가입하기'}
          </Button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-4">
          {mode === 'login' ? '계정이 없으신가요? ' : '이미 계정이 있으신가요? '}
          <button
            type="button"
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
            className="text-slate-300 hover:text-white underline"
          >
            {mode === 'login' ? '회원가입' : '로그인'}
          </button>
        </p>
      </div>
    </div>
  );
}
