# radsafety-web 구현 로드맵 (Roadmap)

대한핵의학회 방사선안전위원회 공식 웹사이트(`ai4radmed.com/radsafety`) 구축을 위한 단계별 실현 계획입니다.

## 1. 정적 웹사이트 기반 구축 (Static Foundation)
> **목표**: "빠르고 안전하며 유지보수가 쉬운 정보 제공 플랫폼"
- **기술**: Astro (SSG Mode) + Cloudflare Pages
- **핵심 기능**:
  - **Subdirectory Deployment**: `ai4radmed.com`의 하위 경로(`/radsafety`)에서 완벽하게 동작하도록 `base` 경로 설정.
  - **반응형 디자인**: 모바일/태블릿/PC 어디서나 최적화된 레이아웃.
  - **SEO 최적화**: 검색 엔진 친화적인 구조 (Sitemap, Metadata).

## 2. 콘텐츠 관리 시스템 (Content & Archives)
> **목표**: "위원회 자료와 규정 정보를 체계적으로 제공"
- **자료실 (Data Room)**:
  - 위원회 회의록, 규정집, 서식 등을 다운로드 가능한 형태로 제공.
  - Astro Content Collections (`.md`, `.mdx`)를 활용하여 마크다운으로 콘텐츠 관리.
- **공지사항 (Notices)**:
  - 중요 알림, 행사 일정 게시.
  - (옵션) RSS 피드 제공.

## 3. PWA (Progressive Web App) 도입
> **목표**: "앱처럼 설치되어 언제든 접근 가능한 안전 가이드"
- **기능**:
  - 스마트폰 홈 화면에 아이콘 추가 (Installable).
  - 오프라인 상태에서도 주요 연락처 및 비상 행동 요령 조회 가능.
  - **캐싱(Caching) 전략**: 자주 보는 규정 문서는 로컬에 저장하여 즉시 로딩.

## 4. 확장 기능 (Future Extensions)
> **목표**: "단순 정보 제공을 넘어선 사용자 상호작용"
- **검색 기능 (Search)**:
  - 클라이언트 사이드 검색 (Pagefind) 도입으로 별도 서버 없이 빠르고 강력한 검색 구현.
- **피드백 (Feedback)**:
  - 구글 폼(Google Forms) 또는 이메일 링크를 통한 간편 문의 접수.

## 5. 단계별 실행 계획 (Action Plan)

### [Phase 1] 기본 구조 및 배포 (Foundation)
- `gemini.md` 지침에 따른 프로젝트 구조 확립.
- `radsafety` 하위 경로 배포 테스트 (Cloudflare Pages).
- 기본 페이지 (소개, 조직도, 오시는 길) 구현.

### [Phase 2] 콘텐츠 마이그레이션 (Content)
- 기존 자료(Hwp, PDF 등)를 웹 친화적인 포맷으로 정리 및 업로드.
- 자료실 및 게시판 레이아웃 디자인 및 구현.

### [Phase 3] 고도화 (Advanced)
- PWA 설정 (`manifest.json`, Service Worker).
- 검색 엔진 최적화(SEO) 점검 및 Pagefind 검색 엔진 연동.
