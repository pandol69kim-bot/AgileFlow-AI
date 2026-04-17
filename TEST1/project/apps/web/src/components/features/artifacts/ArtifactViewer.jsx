import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

export function ArtifactViewer({ artifact }) {
  if (!artifact) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 text-sm">
        ← 왼쪽에서 에이전트 산출물을 선택하세요
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: 'var(--color-surface-border)' }}>
        <div>
          <h2 className="text-slate-100 font-semibold">{artifact.filename}</h2>
          <span className="text-xs text-slate-500 font-mono">{artifact.agent_name}</span>
        </div>
      </div>
      <div className="prose prose-invert prose-sm max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {artifact.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
