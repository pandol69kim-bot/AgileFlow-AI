import { describe, expect, it } from 'vitest';
import {
  buildProjectPackageEntries,
  parseGeneratedFilesFromArtifact,
} from './projectPackage.js';

describe('parseGeneratedFilesFromArtifact', () => {
  it('extracts concrete source files from frontend markdown artifacts', () => {
    const artifact = {
      filename: 'frontend_components.md',
      content: [
        '# 컴포넌트 구현 명세',
        '',
        '## src/components/ui/AgentStatusBadge.jsx',
        '```jsx',
        'export function AgentStatusBadge() {',
        "  return <span>ok</span>;",
        '}',
        '```',
        '',
        '## src/components/features/pipeline/AgentStepCard.jsx',
        '```jsx',
        'export function AgentStepCard() {',
        "  return <div>step</div>;",
        '}',
        '```',
      ].join('\n'),
    };

    expect(parseGeneratedFilesFromArtifact(artifact)).toEqual([
      {
        path: 'generated/frontend/src/components/ui/AgentStatusBadge.jsx',
        content: 'export function AgentStatusBadge() {\n  return <span>ok</span>;\n}',
      },
      {
        path: 'generated/frontend/src/components/features/pipeline/AgentStepCard.jsx',
        content: 'export function AgentStepCard() {\n  return <div>step</div>;\n}',
      },
    ]);
  });

  it('extracts only explicit file sections from setup markdown artifacts', () => {
    const artifact = {
      filename: 'backend_setup.md',
      content: [
        '# 백엔드 설정',
        '',
        '## 초기 설정',
        '```bash',
        'npm install fastify',
        '```',
        '',
        '## docker-compose.yml',
        '```yaml',
        'services:\n  redis:\n    image: redis:7-alpine',
        '```',
        '',
        '## 환경 변수 (.env)',
        '```',
        'REDIS_URL=redis://localhost:6379',
        '```',
      ].join('\n'),
    };

    expect(parseGeneratedFilesFromArtifact(artifact)).toEqual([
      {
        path: 'generated/backend/docker-compose.yml',
        content: 'services:\n  redis:\n    image: redis:7-alpine',
      },
      {
        path: 'generated/backend/.env',
        content: 'REDIS_URL=redis://localhost:6379',
      },
    ]);
  });

  it('falls back to prisma schema extraction for backend schema artifacts', () => {
    const artifact = {
      filename: 'backend_schema.md',
      content: [
        '# Prisma Schema',
        '',
        '```prisma',
        'model User {',
        '  id String @id',
        '}',
        '```',
      ].join('\n'),
    };

    expect(parseGeneratedFilesFromArtifact(artifact)).toEqual([
      {
        path: 'generated/backend/prisma/schema.prisma',
        content: 'model User {\n  id String @id\n}',
      },
    ]);
  });

  it('rejects unsafe traversal paths and distant fences', () => {
    const artifact = {
      filename: 'frontend_pages.md',
      content: [
        '## ../src/pages/Admin.jsx',
        '',
        '',
        '',
        '',
        '',
        '```jsx',
        'export function Admin() {}',
        '```',
      ].join('\n'),
    };

    expect(parseGeneratedFilesFromArtifact(artifact)).toEqual([]);
  });
});

describe('buildProjectPackageEntries', () => {
  it('adds usage README, generated sources, and keeps final report under docs', () => {
    const project = {
      title: '샘플 프로젝트',
      ideaInput: '아이디어 설명',
    };

    const artifacts = [
      {
        filename: 'frontend_pages.md',
        content: [
          '## src/pages/HomePage.jsx',
          '```jsx',
          'export function HomePage() {',
          "  return <main>home</main>;",
          '}',
          '```',
        ].join('\n'),
      },
      {
        filename: 'final_report.md',
        content: '# 최종 리포트',
      },
    ];

    const entries = buildProjectPackageEntries(project, artifacts);
    const names = entries.map((entry) => entry.name);

    expect(names).toContain('README.md');
    expect(names).toContain('INDEX.md');
    expect(names).toContain('generated/frontend/src/pages/HomePage.jsx');
    expect(names).toContain('docs/09-final-report.md');
    expect(names).not.toContain('docs/misc/final_report.md');

    const readme = entries.find((entry) => entry.name === 'README.md');
    expect(readme.content).toContain('generated/frontend/src/pages/HomePage.jsx');
    expect(readme.content).toContain('docs/09-final-report.md');
  });

  it('reports duplicate generated paths in the README', () => {
    const project = {
      title: '중복 테스트',
      ideaInput: '중복 경로 점검',
    };

    const artifacts = [
      {
        filename: 'frontend_pages.md',
        content: [
          '## src/pages/HomePage.jsx',
          '```jsx',
          'export function HomePage() { return <main>a</main>; }',
          '```',
        ].join('\n'),
      },
      {
        filename: 'frontend_components.md',
        content: [
          '## src/pages/HomePage.jsx',
          '```jsx',
          'export function HomePage() { return <main>b</main>; }',
          '```',
        ].join('\n'),
      },
    ];

    const entries = buildProjectPackageEntries(project, artifacts);
    const readme = entries.find((entry) => entry.name === 'README.md');
    const homePageEntries = entries.filter((entry) => entry.name === 'generated/frontend/src/pages/HomePage.jsx');

    expect(homePageEntries).toHaveLength(1);
    expect(readme.content).toContain('## 중복 경로 경고');
    expect(readme.content).toContain('generated/frontend/src/pages/HomePage.jsx');
    expect(readme.content).toContain('frontend_pages.md, frontend_components.md');
  });
});