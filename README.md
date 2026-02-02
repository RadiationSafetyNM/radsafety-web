> **"한국 현장 근무자를 위한 세계 최고의 반응 속도"**
> 한국의 네트워크 환경에 최적화되어, 언제 어디서나 **"클릭 즉시"** 0.1초 만에 열리는 체감 속도와 실시간 데이터 공유를 실현한 하이브리드 웹앱입니다.

## 1. 개발 철학 및 목표
> **"한국 현장 근무자를 위한 세계 최고의 반응 속도 구현"**

이 프로젝트는 국내 방사선 안전관리 현장의 특수성을 고려하여 물리적/논리적 응답 속도를 극한으로 단축했습니다.

- **Strategic Vercel Selection (Seoul Region)**: 일반적인 웹앱은 전 세계 평균 속도를 위해 Cloudflare Edge를 선택하지만, 이 앱은 **사용자 100%가 한국 근무자**라는 점에 집중했습니다. 리전을 **서울(ICN1)**로 물리적으로 고정할 수 있는 **Vercel**을 선택함으로써, 한국 내에서의 동적 요청 속도를 극대화했습니다.
- **Fastest DNS**: `radsafety.kr` 도메인은 속도가 가장 빠른 **Cloudflare DNS**를 사용하여 접속 시간을 단축했습니다.
    - **필수 설정**: Cloudflare DNS 설정에서 반드시 **`Proxy status: DNS Only` (회색 구름 아이콘)**로 설정해야 합니다.
    - **이유**: Vercel 자체의 Edge Network를 직접 타도록 하여, 이중 프록시(Cloudflare → Vercel)로 인한 불필요한 지연을 방지하기 위함입니다.
- **Instant Interaction**: 사용자가 클릭했을 때 "기다림(Loading)"을 전혀 느끼지 않도록 설계되었습니다.
    - **캐싱 전략 (SWR)**: Stale-While-Revalidate
        1. 앱 실행 시 **브라우저 로컬 캐시**로 기존 데이터를 **0ms** 만에 즉시 표시
        2. 백그라운드에서 **Supabase DB**와 조용히 동기화
        3. 사용자 대기 시간 "Zero" 달성

## 2. 기술 스택 및 아키텍처
최신 웹 기술을 조합하여 최상의 사용자 경험을 제공합니다.

- **프레임워크**: [Astro](https://astro.build) (세계에서 가장 빠른 웹 프레임워크)
- **렌더링 방식**: **Hybrid Rendering** (SSG + SSR)
- **데이터베이스**: [Supabase](https://supabase.com) (PostgreSQL 기반 실시간 DB)
- **배포**: [Vercel](https://vercel.com) Edge Network
- **캐싱 전략**: **SWR (Stale-While-Revalidate)**
    - 앱 실행 시 브라우저 캐시로 즉시 화면 표시
    - 백그라운드에서 DB 최신 데이터 동기화
    - 사용자 대기 시간 "Zero"

## 3. 프로젝트 구조 (Directory Structure)

```text
/
├── src/
│   ├── content/           # [고정 자료] 규정, 법령, 가이드 등 (마크다운 관리)
│   ├── pages/             # 웹페이지 라우팅 및 UI
│   ├── actions/           # [서버 로직] DB 입력/수정/삭제 보안 처리 (Astro Actions)
│   ├── lib/               # [유틸리티] Supabase 클라이언트 설정 등
│   └── components/        # 재사용 가능한 UI 컴포넌트
├── astro.config.mjs       # Astro 및 Vercel 어댑터 설정
├── findings_schema.sql    # Supabase DB 테이블 생성 스크립트
└── README.md              # 프로젝트 공식 문서 (본 파일)
```

## 4. 개발 및 유지보수 가이드 (Maintenance)

### 로컬 개발 환경 실행
```bash
# 개발 서버 시작 (포트 4321 고정)
npm run dev -- --port 4321
```

### 데이터 관리 정책
1.  **지적/권고사항 (Findings)**:
    - **입력**: 사용자가 앱에서 등록 (즉시 Supabase DB 저장)
    - **공유**: 모든 사용자가 실시간 조회가 가능함
2.  **공식 문서화 (Archiving)**:
    - DB에 쌓인 데이터 중 '영구 보존'이나 '공식 지침'이 된 건은 추후 **마크다운(`.md`) 파일**로 변환하여 `src/content`에 저장하는 것을 권장합니다.
    - 이유: 정적 파일이 DB보다 조회 속도가 빠르고 검색엔진(SEO)에 더 유리하기 때문입니다.

### 배포 시 주의사항 (Vercel)
- 이 프로젝트는 `@astrojs/vercel` 어댑터를 사용합니다.
- Vercel 환경 변수에 `PUBLIC_SUPABASE_URL`와 `PUBLIC_SUPABASE_ANON_KEY`가 반드시 설정되어야 합니다.

---

## 5. 구현 로드맵 (Roadmap)

### [완료] Phase 1: 기반 구축 (Foundation)
- [x] Astro 기반 정적 웹사이트 구축
- [x] 반응형 모바일/PC 레이아웃 (Grid System 최적화)
- [x] 햄버거 메뉴 및 직관적인 네비게이션

### [완료] Phase 2: 데이터 공유 시스템 (Shared DB)
- [x] Supabase 연동 및 DB 스키마 설계
- [x] 하이브리드 렌더링(Vercel Adapter) 적용
- [x] Astro Actions를 통한 안전한 등록/수정/삭제 구현

### [진행 중] Phase 3: 고도화 (Advanced)
- [ ] **PWA (Progressive Web App)**: 앱 설치 기능 및 오프라인 지원 강화
- [ ] **검색 엔진(Pagefind)**: 서버 없이 클라이언트에서 즉시 작동하는 초고속 검색
- [ ] **관리자 도구**: DB 데이터를 마크다운으로 추출(Export)하는 기능
