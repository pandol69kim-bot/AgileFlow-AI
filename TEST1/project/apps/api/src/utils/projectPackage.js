const DOC_PATH_MAP = {
  'idea_analysis_report.md': 'docs/01-idea-analysis.md',
  'product_requirements.md': 'docs/02-requirements.md',
  'design_system.md': 'docs/03-design-system.md',
  'wireframes.md': 'docs/03-wireframes.md',
  'components.md': 'docs/03-components.md',
  'tech_stack.md': 'docs/04-tech-stack.md',
  'architecture.md': 'docs/04-architecture.md',
  'database_schema.md': 'docs/04-database-schema.md',
  'project_structure.md': 'docs/04-project-structure.md',
  'frontend_setup.md': 'docs/05-frontend-setup.md',
  'frontend_components.md': 'docs/05-frontend-components.md',
  'frontend_pages.md': 'docs/05-frontend-pages.md',
  'frontend_hooks.md': 'docs/05-frontend-hooks.md',
  'backend_setup.md': 'docs/06-backend-setup.md',
  'backend_schema.md': 'docs/06-backend-schema.md',
  'backend_routes.md': 'docs/06-backend-routes.md',
  'backend_services.md': 'docs/06-backend-services.md',
  'test_strategy.md': 'docs/07-test-strategy.md',
  'backend_tests.md': 'docs/07-backend-tests.md',
  'frontend_tests.md': 'docs/07-frontend-tests.md',
  'e2e_tests.md': 'docs/07-e2e-tests.md',
  'code_review.md': 'docs/07-code-review.md',
  'docker.md': 'docs/08-docker.md',
  'cicd.md': 'docs/08-cicd.md',
  'infrastructure.md': 'docs/08-infrastructure.md',
  'monitoring.md': 'docs/08-monitoring.md',
  'project_dashboard.md': 'docs/09-project-dashboard.md',
  'final_report.md': 'docs/09-final-report.md',
};

const GENERATED_ROOT_BY_ARTIFACT = {
  'frontend_setup.md': 'frontend',
  'frontend_components.md': 'frontend',
  'frontend_pages.md': 'frontend',
  'frontend_hooks.md': 'frontend',
  'backend_setup.md': 'backend',
  'backend_schema.md': 'backend',
  'backend_routes.md': 'backend',
  'backend_services.md': 'backend',
};

const FALLBACK_FILE_BY_ARTIFACT = {
  'backend_schema.md': 'prisma/schema.prisma',
};

const SKIPPED_FENCE_LANGUAGES = new Set(['bash', 'shell', 'sh', 'zsh', 'powershell', 'ps1', 'console']);
const MAX_HEADING_LENGTH = 500;
const MAX_FENCE_SCAN_LINES = 5;

function isPlausibleFilePath(value) {
  if (!value || /\s{2,}/.test(value)) return false;
  if (/^(GET|POST|PUT|PATCH|DELETE)\s+/i.test(value)) return false;
  if (value === 'Dockerfile' || value === '.env') return true;
  if (/^[\w.-]+\.env(?:\.[\w.-]+)?$/i.test(value)) return true;
  if (/^[\w./-]+\.[A-Za-z0-9]+$/.test(value)) return true;
  return /^[\w.-]+\/(?:[\w.-]+\/)*[\w.-]+$/.test(value);
}

function sanitizeRelativePath(value) {
  const normalized = value.replace(/\\/g, '/').replace(/^\.\//, '').trim();
  if (!normalized || normalized.startsWith('/') || /^[A-Za-z]:/.test(normalized)) return null;
  const segments = normalized.split('/');
  if (segments.some((segment) => !segment || segment === '.' || segment === '..')) return null;
  const resolved = segments.join('/');
  if (resolved.includes('..')) return null;
  return resolved;
}

function extractHeadingPath(rawHeading) {
  const heading = rawHeading.trim().replace(/`/g, '');
  if (heading.length > MAX_HEADING_LENGTH) return null;

  const parenMatches = [...heading.matchAll(/\(([^()]+)\)/g)];
  for (const match of parenMatches) {
    const candidate = sanitizeRelativePath(match[1]);
    if (candidate && isPlausibleFilePath(candidate)) return candidate;
  }

  const primary = heading.split(/\s+[—-]\s+/u)[0].trim();
  const candidate = sanitizeRelativePath(primary);
  if (candidate && isPlausibleFilePath(candidate)) return candidate;

  return null;
}

function readFence(lines, startIndex) {
  let index = startIndex;
  const scanLimit = Math.min(lines.length, startIndex + MAX_FENCE_SCAN_LINES);

  while (index < scanLimit) {
    const line = lines[index];
    if (/^#{2,6}\s+/.test(line)) return null;
    const fenceStart = line.match(/^```\s*([\w-]*)\s*$/);
    if (fenceStart) {
      const language = fenceStart[1].toLowerCase();
      const contentLines = [];
      let cursor = index + 1;

      while (cursor < lines.length && !/^```\s*$/.test(lines[cursor])) {
        contentLines.push(lines[cursor]);
        cursor += 1;
      }

      if (cursor >= lines.length) return null;

      return {
        language,
        content: contentLines.join('\n').trim(),
        endIndex: cursor,
      };
    }
    index += 1;
  }

  return null;
}

function readSingleFence(content) {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const fences = [];

  for (let index = 0; index < lines.length; index += 1) {
    const fence = readFence(lines, index);
    if (!fence) continue;
    fences.push(fence);
    index = fence.endIndex;
  }

  return fences.length === 1 ? fences[0] : null;
}

function buildIndexMd(project, docEntries, generatedEntries, collisions) {
  const docLines = docEntries.length
    ? docEntries.map((entry) => `- [${entry.name}](./${entry.name})`)
    : ['- 문서 산출물이 없습니다.'];

  const sourceLines = generatedEntries.length
    ? generatedEntries.map((entry) => `- [${entry.name}](./${entry.name})`)
    : ['- 추출된 소스 파일이 없습니다.'];

  const collisionLines = collisions.length
    ? ['', '### 중복 경로 경고', ...collisions.map((item) => `- ${item.path} (${item.sources.join(', ')})`)]
    : [];

  return [
    `# ${project.title}`,
    '',
    project.ideaInput ? `> ${project.ideaInput}` : null,
    '',
    '## 패키지 구성',
    '',
    '### 문서',
    ...docLines,
    '',
    '### 생성된 개발 소스',
    ...sourceLines,
    ...collisionLines,
  ].filter(Boolean).join('\n');
}

function buildUsageReadme(project, docEntries, generatedEntries, collisions) {
  const frontendFiles = generatedEntries.filter((entry) => entry.name.startsWith('generated/frontend/'));
  const backendFiles = generatedEntries.filter((entry) => entry.name.startsWith('generated/backend/'));
  const docsList = docEntries.map((entry) => `- ${entry.name}`);
  const sourceList = generatedEntries.map((entry) => `- ${entry.name}`);
  const collisionList = collisions.map((item) => `- ${item.path}: ${item.sources.join(', ')}`);

  return [
    `# ${project.title}`,
    '',
    '이 ZIP은 AgileFlow 파이프라인 결과물을 문서와 개발 소스로 정리한 패키지입니다.',
    '',
    '## 포함 내용',
    '',
    `- docs/: 원본 에이전트 산출물 ${docEntries.length}개`,
    `- generated/frontend/: 추출된 프론트엔드 소스 ${frontendFiles.length}개`,
    `- generated/backend/: 추출된 백엔드 소스 ${backendFiles.length}개`,
    '',
    '## 사용 방법',
    '',
    '1. docs/ 아래 문서를 먼저 읽고 전체 구조와 의도를 확인합니다.',
    '2. generated/frontend 와 generated/backend 파일을 새 프로젝트나 기존 저장소에 맞게 복사합니다.',
    '3. docs/05-frontend-setup.md 와 docs/06-backend-setup.md 를 참고해 환경 변수와 의존성을 맞춥니다.',
    '4. 생성 소스는 AI 산출물이므로 실행 전에 경로, 의존성, 보안 설정을 검토합니다.',
    '5. 동일 경로 충돌이 있으면 아래 경고 목록을 참고해 어떤 산출물이 제외됐는지 확인합니다.',
    '',
    '## 추출된 소스 파일',
    '',
    ...(sourceList.length ? sourceList : ['- 추출된 소스 파일이 없습니다.']),
    ...(collisionList.length ? ['', '## 중복 경로 경고', '', ...collisionList] : []),
    '',
    '## 포함된 문서',
    '',
    ...(docsList.length ? docsList : ['- 포함된 문서가 없습니다.']),
  ].join('\n');
}

export function toSlug(title) {
  return title
    .replace(/[^\w\s가-힣]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 40) || 'project';
}

export function parseGeneratedFilesFromArtifact(artifact) {
  const root = GENERATED_ROOT_BY_ARTIFACT[artifact.filename];
  if (!root || !artifact.content) return [];

  const lines = artifact.content.replace(/\r\n/g, '\n').split('\n');
  const seen = new Set();
  const entries = [];

  for (let index = 0; index < lines.length; index += 1) {
    const headingMatch = lines[index].match(/^#{2,6}\s+(.+?)\s*$/);
    if (!headingMatch) continue;

    const relativePath = extractHeadingPath(headingMatch[1]);
    if (!relativePath || seen.has(relativePath)) continue;

    const fence = readFence(lines, index + 1);
    if (!fence || !fence.content) continue;
    if (SKIPPED_FENCE_LANGUAGES.has(fence.language)) {
      index = fence.endIndex;
      continue;
    }

    seen.add(relativePath);
    entries.push({
      path: `generated/${root}/${relativePath}`,
      content: fence.content,
    });
    index = fence.endIndex;
  }

  if (entries.length > 0) return entries;

  const fallbackPath = FALLBACK_FILE_BY_ARTIFACT[artifact.filename];
  if (!fallbackPath) return [];

  const singleFence = readSingleFence(artifact.content);
  if (!singleFence || !singleFence.content || SKIPPED_FENCE_LANGUAGES.has(singleFence.language)) {
    return [];
  }

  return [{
    path: `generated/${root}/${fallbackPath}`,
    content: singleFence.content,
  }];
}

export function buildProjectPackageEntries(project, artifacts) {
  const docEntries = artifacts.map((artifact) => ({
    name: DOC_PATH_MAP[artifact.filename] ?? `docs/misc/${artifact.filename}`,
    content: artifact.content ?? '',
  }));

  const generatedEntryMap = new Map();
  const collisions = [];

  for (const artifact of artifacts) {
    for (const entry of parseGeneratedFilesFromArtifact(artifact)) {
      const existing = generatedEntryMap.get(entry.path);
      if (existing) {
        const collision = collisions.find((item) => item.path === entry.path);
        if (collision) {
          collision.sources.push(artifact.filename);
        } else {
          collisions.push({ path: entry.path, sources: [existing.source, artifact.filename] });
        }
        continue;
      }

      generatedEntryMap.set(entry.path, {
        name: entry.path,
        content: entry.content,
        source: artifact.filename,
      });
    }
  }

  const generatedEntries = [...generatedEntryMap.values()].map(({ source, ...entry }) => entry);

  return [
    {
      name: 'README.md',
      content: buildUsageReadme(project, docEntries, generatedEntries, collisions),
    },
    {
      name: 'INDEX.md',
      content: buildIndexMd(project, docEntries, generatedEntries, collisions),
    },
    ...docEntries,
    ...generatedEntries,
  ];
}