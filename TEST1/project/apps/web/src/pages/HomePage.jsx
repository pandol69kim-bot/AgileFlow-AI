import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../lib/api.js';
import { Button } from '../components/ui/Button.jsx';

const DEFAULT_AI_PROFILE = 'claude';

export function HomePage() {
  const [idea, setIdea] = useState('');
  const [aiProfile, setAiProfile] = useState(DEFAULT_AI_PROFILE);
  const navigate = useNavigate();

  const { data: recentProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: () => api.get('/projects').then((r) => r.data.data),
  });

  const { data: aiProfiles = [] } = useQuery({
    queryKey: ['ai-profiles'],
    queryFn: () => api.get('/projects/ai-profiles').then((r) => r.data.data),
  });

  useEffect(() => {
    if (!aiProfiles.length) return;
    const selectedExists = aiProfiles.some((profile) => profile.id === aiProfile);
    if (selectedExists) return;
    const fallback = aiProfiles.find((profile) => profile.isDefault)?.id ?? DEFAULT_AI_PROFILE;
    setAiProfile(fallback);
  }, [aiProfile, aiProfiles]);

  const startPipeline = useMutation({
    mutationFn: ({ ideaText, selectedAiProfile }) => api.post('/projects', {
      idea_input: ideaText,
      ai_profile: selectedAiProfile,
    }),
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
                startPipeline.mutate({ ideaText: idea.trim(), selectedAiProfile: aiProfile });
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
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm text-slate-400">파이프라인 AI 선택</label>
              <span className="text-xs text-slate-600">실패 후 재시도에도 같은 AI를 유지합니다</span>
            </div>
            <div className="grid gap-2 md:grid-cols-3">
              {aiProfiles.map((profile) => {
                const selected = aiProfile === profile.id;
                return (
                  <button
                    key={profile.id}
                    type="button"
                    disabled={!profile.available}
                    onClick={() => setAiProfile(profile.id)}
                    className="rounded-xl border p-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                    style={{
                      borderColor: selected ? 'var(--color-primary-500)' : 'var(--color-surface-border)',
                      backgroundColor: selected ? 'rgba(56, 189, 248, 0.10)' : 'var(--color-surface-overlay)',
                    }}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-sm font-semibold ${selected ? 'text-sky-300' : 'text-slate-200'}`}>{profile.label}</span>
                      <span className="text-[10px] uppercase tracking-wide text-slate-500">{profile.provider}</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{profile.description}</p>
                    {!profile.available && (
                      <p className="mt-2 text-[11px] text-amber-400">현재 사용 불가: {profile.reason ?? '설정 필요'}</p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-slate-600">Shift+Enter 줄바꿈 · Enter 실행</span>
            <Button
              disabled={!idea.trim()}
              isLoading={startPipeline.isPending}
              onClick={() => startPipeline.mutate({ ideaText: idea.trim(), selectedAiProfile: aiProfile })}
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
                  <div className="min-w-0">
                    <span className="text-sm text-slate-300 truncate block">{p.title}</span>
                    {p.aiLabel && <span className="text-[11px] text-slate-500 mt-1 block">{p.aiLabel}</span>}
                  </div>
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
