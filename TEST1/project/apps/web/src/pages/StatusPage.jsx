import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api.js';

const SERVICE_LABELS = {
  api:      { name: 'API 서버',       icon: '⚡' },
  db:       { name: 'PostgreSQL DB',  icon: '🗄️' },
  redis:    { name: 'Redis',          icon: '🔴' },
  pipeline: { name: 'Pipeline 서버',  icon: '🤖' },
};

export function StatusPage() {
  const { data, isLoading, dataUpdatedAt, refetch, isFetching } = useQuery({
    queryKey: ['status'],
    queryFn: () => api.get('/status').then((r) => r.data),
    refetchInterval: 10_000,
    retry: false,
  });

  const updatedAt = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString('ko-KR')
    : null;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-slate-100">서비스 상태</h1>
          <p className="text-xs text-slate-500 mt-1">10초마다 자동 갱신{updatedAt ? ` · 마지막: ${updatedAt}` : ''}</p>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="text-xs px-3 py-1.5 rounded-lg border transition-colors hover:bg-surface-overlay disabled:opacity-40"
          style={{ borderColor: 'var(--color-surface-border)', color: 'var(--color-primary-400)' }}
        >
          {isFetching ? '갱신 중…' : '↻ 새로고침'}
        </button>
      </div>

      {/* 전체 상태 배너 */}
      {!isLoading && data && (
        <div
          className="rounded-xl p-4 mb-6 flex items-center gap-3"
          style={{
            backgroundColor: data.status === 'healthy'
              ? 'rgba(16,185,129,0.1)'
              : 'rgba(239,68,68,0.1)',
            border: `1px solid ${data.status === 'healthy' ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`,
          }}
        >
          <span className="text-2xl">{data.status === 'healthy' ? '✅' : '⚠️'}</span>
          <div>
            <p className="text-sm font-semibold" style={{ color: data.status === 'healthy' ? '#34d399' : '#f87171' }}>
              {data.status === 'healthy' ? '모든 서비스 정상' : '일부 서비스 이상'}
            </p>
            <p className="text-xs text-slate-500">{data.timestamp ? new Date(data.timestamp).toLocaleString('ko-KR') : ''}</p>
          </div>
        </div>
      )}

      {/* 서비스 카드 목록 */}
      <div className="flex flex-col gap-3">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : data
          ? Object.entries(data.services).map(([key, svc]) => (
              <ServiceCard key={key} serviceKey={key} svc={svc} />
            ))
          : <ErrorCard />
        }
      </div>

      {/* 도움말 */}
      {!isLoading && data && !data.services.pipeline?.ok && (
        <div
          className="mt-6 rounded-xl p-4 text-xs text-slate-400"
          style={{ backgroundColor: 'var(--color-surface-raised)', border: '1px solid var(--color-surface-border)' }}
        >
          <p className="font-semibold text-slate-300 mb-2">🤖 Pipeline 서버 시작 방법</p>
          <code className="block bg-black/40 rounded p-3 font-mono text-slate-300 whitespace-pre">{`cd project/apps/pipeline\n.\\venv\\Scripts\\Activate.ps1\nuvicorn main:app --reload --port 8000`}</code>
        </div>
      )}
    </div>
  );
}

function ServiceCard({ serviceKey, svc }) {
  const meta = SERVICE_LABELS[serviceKey] ?? { name: serviceKey, icon: '●' };

  return (
    <div
      className="rounded-xl p-4 flex items-center justify-between"
      style={{ backgroundColor: 'var(--color-surface-raised)', border: '1px solid var(--color-surface-border)' }}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl w-7 text-center">{meta.icon}</span>
        <div>
          <p className="text-sm font-medium text-slate-200">{meta.name}</p>
          {svc.error && (
            <p className="text-xs text-red-400 mt-0.5 font-mono truncate max-w-xs">{svc.error}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {svc.latency != null && (
          <span className="text-xs text-slate-500 font-mono">{svc.latency}ms</span>
        )}
        <StatusBadge ok={svc.ok} />
      </div>
    </div>
  );
}

function StatusBadge({ ok }) {
  return (
    <span
      className="text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{
        backgroundColor: ok ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
        color: ok ? '#34d399' : '#f87171',
      }}
    >
      {ok ? '정상' : '오류'}
    </span>
  );
}

function SkeletonCard() {
  return (
    <div
      className="rounded-xl p-4 h-16 animate-pulse"
      style={{ backgroundColor: 'var(--color-surface-raised)', border: '1px solid var(--color-surface-border)' }}
    />
  );
}

function ErrorCard() {
  return (
    <div
      className="rounded-xl p-4 text-center text-sm text-red-400"
      style={{ backgroundColor: 'var(--color-surface-raised)', border: '1px solid rgba(239,68,68,0.3)' }}
    >
      상태 정보를 불러올 수 없습니다. API 서버를 확인하세요.
    </div>
  );
}
