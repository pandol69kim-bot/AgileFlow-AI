import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api.js';

export function ProjectsPage() {
  const navigate = useNavigate();
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => api.get('/projects').then((r) => r.data.data),
  });

  if (isLoading) return <div className="p-8 text-slate-500 text-sm">불러오는 중...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-xl font-semibold text-slate-100 mb-6">프로젝트 목록</h1>
      {!projects?.length ? (
        <p className="text-slate-500 text-sm">아직 프로젝트가 없습니다.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => navigate(`/pipeline/${p.id}`)}
              className="flex items-center justify-between px-5 py-4 rounded-xl border text-left hover:bg-surface-overlay transition-colors"
              style={{ borderColor: 'var(--color-surface-border)', backgroundColor: 'var(--color-surface-raised)' }}
            >
              <div>
                <p className="text-sm font-medium text-slate-200">{p.title}</p>
                <p className="text-xs text-slate-500 mt-1 truncate max-w-sm">{p.idea_input}</p>
                {p.aiLabel && <p className="text-[11px] text-slate-600 mt-1">{p.aiLabel}</p>}
              </div>
              <div className="text-right shrink-0 ml-4">
                <span className={`text-xs ${p.status === 'completed' ? 'text-emerald-400' : p.status === 'running' ? 'text-yellow-400 animate-pulse' : 'text-slate-500'}`}>
                  {p.status === 'completed' ? '✅ 완료' : p.status === 'running' ? '⚡ 실행중' : p.status}
                </span>
                <p className="text-xs text-slate-600 mt-1">{new Date(p.created_at).toLocaleDateString('ko-KR')}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
