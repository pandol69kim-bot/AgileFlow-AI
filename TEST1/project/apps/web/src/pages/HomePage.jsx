import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../lib/api.js';
import { Button } from '../components/ui/Button.jsx';

export function HomePage() {
  const [idea, setIdea] = useState('');
  const navigate = useNavigate();

  const { data: recentProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: () => api.get('/projects').then((r) => r.data.data),
  });

  const startPipeline = useMutation({
    mutationFn: (ideaText) => api.post('/projects', { idea_input: ideaText }),
    onSuccess: (res) => navigate(`/pipeline/${res.data.data.id}`),
  });

  return (
    <div className="min-h-[calc(100vh-57px)] flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <div className="text-5xl mb-3" style={{ color: 'var(--color-primary-400)' }}>✦</div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">AgileFlow</h1>
          <p className="text-slate-400">AI가 기획부터 배포까지 자동으로 완성합니다</p>
        </div>

        <div
          className="rounded-2xl border p-6"
          style={{ borderColor: 'var(--color-surface-border)', backgroundColor: 'var(--color-surface-raised)' }}
        >
          <label className="block text-sm text-slate-400 mb-2">아이디어를 입력하세요</label>
          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey && idea.trim()) {
                e.preventDefault();
                startPipeline.mutate(idea.trim());
              }
            }}
            placeholder="예: 반려동물 건강관리 앱&#10;예: 팀 일정 관리 SaaS&#10;예: 중고책 거래 플랫폼"
            rows={4}
            className="w-full rounded-xl p-4 text-slate-200 placeholder-slate-600 resize-none focus:outline-none focus:ring-1 font-mono text-sm transition-colors"
            style={{
              backgroundColor: 'var(--color-surface-overlay)',
              borderColor: 'var(--color-surface-border)',
              border: '1px solid var(--color-surface-border)',
            }}
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-slate-600">Shift+Enter 줄바꿈 · Enter 실행</span>
            <Button
              disabled={!idea.trim()}
              isLoading={startPipeline.isPending}
              onClick={() => startPipeline.mutate(idea.trim())}
            >
              ▶ 파이프라인 시작
            </Button>
          </div>
        </div>

        {recentProjects?.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xs text-slate-500 uppercase tracking-widest mb-3">최근 프로젝트</h3>
            <div className="flex flex-col gap-2">
              {recentProjects.slice(0, 5).map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => navigate(`/pipeline/${p.id}`)}
                  className="flex items-center justify-between px-4 py-3 rounded-lg border text-left hover:bg-surface-overlay transition-colors"
                  style={{ borderColor: 'var(--color-surface-border)', backgroundColor: 'var(--color-surface-raised)' }}
                >
                  <span className="text-sm text-slate-300 truncate">{p.title}</span>
                  <span className={`text-xs ml-3 shrink-0 ${p.status === 'completed' ? 'text-emerald-400' : p.status === 'running' ? 'text-yellow-400' : 'text-slate-500'}`}>
                    {p.status === 'completed' ? '✅ 완료' : p.status === 'running' ? '⚡ 실행중' : p.status}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
