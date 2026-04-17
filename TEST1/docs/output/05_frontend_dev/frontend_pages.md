# 페이지 구현 명세 — AgileFlow

## src/pages/HomePage.jsx
```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { api } from '../lib/api';

export function HomePage() {
  const [idea, setIdea] = useState('');
  const navigate = useNavigate();

  const startPipeline = useMutation({
    mutationFn: (ideaText) => api.post('/projects', { idea_input: ideaText }),
    onSuccess: (data) => navigate(`/pipeline/${data.data.id}`),
  });

  return (
    <div className="min-h-screen bg-surface-base flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-slate-100 mb-2">✦ AgileFlow</h1>
      <p className="text-slate-400 mb-8">AI가 기획부터 배포까지 자동으로 완성합니다</p>

      <div className="w-full max-w-2xl">
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="아이디어를 입력하세요... (예: 반려동물 건강관리 앱)"
          rows={4}
          className="w-full bg-surface-raised border border-surface-border rounded-xl p-4 text-slate-200 placeholder-slate-600 resize-none focus:outline-none focus:border-primary-500 transition-colors font-mono text-sm"
        />
        <div className="flex justify-end mt-3">
          <button
            type="button"
            disabled={!idea.trim() || startPipeline.isPending}
            onClick={() => startPipeline.mutate(idea)}
            className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 disabled:opacity-40 text-white rounded-lg font-medium transition-colors"
          >
            {startPipeline.isPending ? '시작 중...' : '▶ 파이프라인 시작'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

## src/pages/PipelinePage.jsx
```jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePipeline } from '../hooks/usePipeline';
import { PipelineProgressPanel } from '../components/features/pipeline/PipelineProgressPanel';
import { ArtifactViewer } from '../components/features/artifacts/ArtifactViewer';

export function PipelinePage() {
  const { projectId } = useParams();
  const { project, agentStatuses, selectedArtifact, setSelectedArtifact } = usePipeline(projectId);

  return (
    <div className="min-h-screen bg-surface-base text-slate-200 flex flex-col">
      <header className="border-b border-surface-border px-6 py-4 flex items-center justify-between">
        <h2 className="font-semibold">{project?.title ?? '파이프라인 실행 중...'}</h2>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 border-r border-surface-border p-4 overflow-y-auto">
          <PipelineProgressPanel agentStatuses={agentStatuses} onViewArtifact={setSelectedArtifact} />
        </aside>
        <main className="flex-1 p-6 overflow-y-auto">
          {selectedArtifact
            ? <ArtifactViewer artifact={selectedArtifact} />
            : <p className="text-slate-500 text-sm">← 왼쪽에서 산출물을 선택하세요</p>
          }
        </main>
      </div>
    </div>
  );
}
```
