# 데이터베이스 스키마 — AgileFlow

## ERD 요약
```
User (1) ──< Project (1) ──< AgentArtifact (N)
                    │
                    └──< PipelineLog (N)
```

## 테이블 정의

### users
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK, DEFAULT gen_random_uuid() | 사용자 ID |
| email | VARCHAR(255) | UNIQUE, NOT NULL | 이메일 |
| name | VARCHAR(100) | NOT NULL | 이름 |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | 생성일 |

### projects
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | 프로젝트 ID |
| user_id | UUID | FK → users.id | 소유자 |
| title | VARCHAR(200) | NOT NULL | 프로젝트명 |
| idea_input | TEXT | NOT NULL | 원본 아이디어 |
| status | VARCHAR(20) | NOT NULL | pending/running/completed/failed |
| current_step | INT | DEFAULT 0 | 현재 실행 단계 |
| checkpoint_data | JSONB | NULLABLE | LangGraph Checkpoint |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | 생성일 |
| completed_at | TIMESTAMPTZ | NULLABLE | 완료일 |

### agent_artifacts
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | 산출물 ID |
| project_id | UUID | FK → projects.id | 프로젝트 |
| agent_name | VARCHAR(50) | NOT NULL | 에이전트명 |
| filename | VARCHAR(100) | NOT NULL | 파일명 |
| content | TEXT | NOT NULL | 마크다운 내용 |
| status | VARCHAR(20) | NOT NULL | pending/completed/failed |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | 생성일 |

### pipeline_logs
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PK | 로그 ID |
| project_id | UUID | FK → projects.id | 프로젝트 |
| agent_name | VARCHAR(50) | NOT NULL | 에이전트명 |
| event_type | VARCHAR(50) | NOT NULL | started/completed/failed/retried |
| message | TEXT | NULLABLE | 로그 메시지 |
| created_at | TIMESTAMPTZ | DEFAULT NOW() | 발생일 |

## 인덱스 전략
- `projects(user_id, created_at DESC)` — 사용자별 프로젝트 목록 조회
- `agent_artifacts(project_id, agent_name)` — 프로젝트별 산출물 조회
- `pipeline_logs(project_id, created_at)` — 실시간 로그 스트리밍
