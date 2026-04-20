import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const AGENT_STEP_NAMES = {
  '01_idea_analyst':    '아이디어 분석',
  '02_planner':         '기획서 작성',
  '03_designer':        'UI/UX 디자인',
  '04_architect':       '시스템 아키텍처',
  '05_frontend_dev':    '프론트엔드 개발',
  '06_backend_dev':     '백엔드 개발',
  '07_tester':          '테스트 & QA',
  '08_deployer':        '배포 & 인프라',
  '09_project_manager': 'PM 리포트',
};

function downloadMarkdown(filename, content) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function ArtifactViewer({ artifact, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsEditing(false);
  }, [artifact?.id]);

  if (!artifact) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 text-sm">
        ← 왼쪽에서 에이전트 산출물을 선택하세요
      </div>
    );
  }

  const agentKey = artifact.agentName ?? artifact.agent_name ?? '';
  const stepName = AGENT_STEP_NAMES[agentKey] ?? agentKey;

  const handleEditStart = () => {
    setEditContent(artifact.content);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!onSave) return;
    setIsSaving(true);
    try {
      await onSave(artifact.id, editContent);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditContent('');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div
        className="flex items-center justify-between pb-4 border-b sticky top-0 z-10"
        style={{
          borderColor: 'var(--color-surface-border)',
          backgroundColor: 'var(--color-surface-base)',
          marginLeft: '-1.5rem',
          marginRight: '-1.5rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          paddingTop: '1.5rem',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <h2 className="text-slate-100 font-semibold">{stepName}</h2>
          <span className="text-xs text-slate-500 font-mono">{artifact.filename}</span>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="text-xs px-3 py-1.5 rounded-md font-medium"
                style={{
                  backgroundColor: 'var(--color-surface-overlay)',
                  border: '1px solid var(--color-surface-border)',
                  color: '#94A3B8',
                }}
              >
                취소
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="text-xs px-3 py-1.5 rounded-md font-medium"
                style={{
                  backgroundColor: isSaving ? 'var(--color-surface-overlay)' : 'var(--color-primary-600)',
                  border: '1px solid transparent',
                  color: isSaving ? '#94A3B8' : '#fff',
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                }}
              >
                {isSaving ? '저장 중...' : '저장'}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEditStart}
                className="text-xs px-3 py-1.5 rounded-md font-medium"
                style={{
                  backgroundColor: 'var(--color-surface-overlay)',
                  border: '1px solid var(--color-surface-border)',
                  color: '#94A3B8',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#E2E8F0'}
                onMouseLeave={e => e.currentTarget.style.color = '#94A3B8'}
              >
                ✏ 편집
              </button>
              <button
                onClick={() => downloadMarkdown(artifact.filename, artifact.content)}
                className="text-xs px-3 py-1.5 rounded-md font-medium"
                style={{
                  backgroundColor: 'var(--color-surface-overlay)',
                  border: '1px solid var(--color-surface-border)',
                  color: 'var(--color-primary-400)',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-primary-500)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-surface-border)'}
              >
                ↓ MD 다운로드
              </button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="w-full font-mono text-sm rounded-lg p-4 resize-y focus:outline-none"
          style={{
            minHeight: '60vh',
            backgroundColor: 'var(--color-surface-overlay)',
            border: '1px solid var(--color-primary-500)',
            color: '#E2E8F0',
            lineHeight: '1.6',
          }}
          spellCheck={false}
        />
      ) : (
        <div className="md-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {artifact.content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
