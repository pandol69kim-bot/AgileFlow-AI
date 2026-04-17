# 컴포넌트 명세 — AgileFlow

## Atoms

### AgentStatusBadge
| Variant | 색상 | 아이콘 | 설명 |
|---------|------|--------|------|
| pending | text-muted | ⏳ | 대기 중 |
| running | warning + pulse | ⚡ | 실행 중 |
| completed | success | ✅ | 완료 |
| failed | error | ❌ | 실패 |

### Button
| Variant | 용도 |
|---------|------|
| primary | 파이프라인 시작, 주요 CTA |
| secondary | 보조 액션 |
| ghost | 텍스트 버튼 |
| danger | 중단, 삭제 |

Size: sm(32px) / md(40px) / lg(48px)

### ProgressBar
- Props: value(0~100), color(primary/success/warning/error)
- 내부 텍스트 퍼센트 표시 옵션

---

## Molecules

### AgentStepCard
- 구성: AgentStatusBadge + 에이전트 이름 + 완료 시간 + [산출물 보기] 링크
- Variants: collapsed / expanded(산출물 미리보기 포함)

### IdeaInputBox
- 구성: Textarea(auto-resize) + ModelSelector + RunButton
- 동작: Enter 키로 제출, Shift+Enter 줄바꿈

### ArtifactCard
- 구성: 파일명 + 에이전트 배지 + 내용 미리보기 + [전체 보기] 버튼
- 클릭 시 SCR-003으로 이동

---

## Organisms

### PipelineProgressPanel
- 구성: 9개 AgentStepCard 세로 리스트
- 병렬 단계(03+04, 05+06)는 나란히 배치
- 전체 진행률 ProgressBar 상단 고정

### ArtifactViewer
- 구성: 파일 탭 네비게이션 + 마크다운 렌더러 + 편집 모드 토글
- 마크다운: react-markdown + rehype-highlight (코드 하이라이팅)

### Header
- 구성: 로고 + 네비게이션(Projects, Settings) + 유저 메뉴
- 스크롤 시 backdrop-blur 효과
