# GEMINI.md - AI Agent Guidelines (radsafety-web)

> 이 문서는 Gemini Code Assistant가 **radsafety-web** 프로젝트를 이해하고 코드를 생성할 때 반드시 참고해야 할 기술적 명세와 지침을 담고 있습니다.

## 0. Language Policy (언어 정책) - **Start Here**
> **최우선 지침**: 본 프로젝트의 모든 커뮤니케이션은 **한국어(Korean)**를 원칙으로 합니다.

1.  **Scope (적용 범위)**:
    -   채팅 대화 (Chat Responses)
    -   사고 과정 및 상태 요약 (Task Status/Summary)
    -   기술 문서 및 주석 (Documentation & Comments)
2.  **Terminology (용어 사용)**:
    -   모든 내용은 한글로 서술하되, 전문 용어는 이해를 돕기 위해 최초 1회 또는 필요한 경우 **영문(English)** 형태로 병기합니다.
    -   유머나 은유적인 표현을 배제하고, **명확하고 전문적인 어조(Professional Tone)**를 유지합니다.

## 0.1 Core Principles (핵심 원칙)
> **기본 철학**: "빠르고, 아름답고, 유지보수하기 쉬운 웹"

1.  **User Experience First (사용자 경험 최우선)**:
    -   웹사이트는 **즉각적**으로 로딩되어야 합니다. (Lighthouse Performance 100 지향)
    -   모든 디바이스(PC, Tablet, Mobile)에서 완벽하게 동작하는 **반응형 디자인**을 구현해야 합니다.
    -   장애인 및 고령자를 배려한 **웹 접근성(Accessibility)**을 준수합니다.

2.  **Extreme Maintenance Simplicity (유지보수 용이성)**:
    -   **"돌아가기만 하는 복잡한 코드"보다 "읽히는 바보 같은 코드"가 낫습니다.**
    -   컴포넌트는 단일 책임 원칙(SRP)을 따르며, 재사용 가능하도록 설계합니다.

3.  **Modern Web Standards (현대적 웹 표준)**:
    -   HTML5 Semantic Tag를 적극 활용하여 문서 구조를 명확히 합니다 (SEO 필수).
    -   PWA (Progressive Web App)를 고려하여 오프라인 지원 및 설치 가능한 앱 경험을 제공합니다.

## 1. Project Context (프로젝트 개요)
- **프로젝트명**: radsafety-web (방사선안전관리 웹 서비스)
- **목표**: 대한핵의학회 방사선안전위원회의 공식 홍보 및 정보 제공 웹사이트.
- **특징**: Astro 프레임워크 기반의 고성능 정적 사이트(SSG).

## 2. Tech Stack & Environment (기술 스택 및 환경)
- **Framework**: Astro 5.0+ (`.astro`)
- **Language**: JavaScript (ES6+) / TypeScript (권장)
- **Styling**: Vanilla CSS (Scoped Styles within `.astro`) or Tailwind (if configured).
- **Package Manager**: npm
- **Deployment**: Static Generation (`npm run build` -> `dist/`)

## 3. Coding Standards (코딩 컨벤션)

### 3.1 Astro Component Structure
`.astro` 파일은 반드시 아래 순서를 따릅니다.

1.  **Frontmatter Script** (`---`):
    -   Imports (Components, Assets)
    -   Props Definition
    -   Data Fetching / Logic
2.  **Template** (HTML):
    -   Semantic Tags (`<main>`, `<article>`, etc.)
    -   Slot Usage
3.  **Style** (`<style>`):
    -   Scoped CSS by default.
    -   Global styles only when necessary (`is:global`).

```astro
---
// 1. Imports
import Card from '../components/Card.astro';
// 2. Props
const { title } = Astro.props;
---

<!-- 3. Template -->
<article class="container">
  <h1>{title}</h1>
  <Card />
</article>

<!-- 4. Style -->
<style>
  .container {
    padding: 1rem;
  }
</style>
```

### 3.2 File Naming
- **Components**: PascalCase (e.g., `Header.astro`, `SafetyCard.astro`)
- **Pages**: kebab-case (e.g., `about-us.astro`, `safety-guide.astro`)
- **Assets**: snake_case or kebab-case (consistent within type).

### 3.3 Logging & Debugging
- 개발 모드(`import.meta.env.DEV`)에서만 `console.log`가 실행되도록 하거나, 배포 전 제거합니다.
- 명확한 에러 메시지를 사용자 UI(Toast, Alert)로 제공하는 것을 지향합니다.

## 4. Project Structure (프로젝트 구조)
```text
/
├── public/             # 정적 자산 (favicon, robots.txt, _redirects)
├── src/
│   ├── components/     # 재사용 가능한 UI 컴포넌트
│   ├── layouts/        # 페이지 레이아웃 (Layout.astro)
│   ├── pages/          # 파일 기반 라우팅
│   ├── styles/         # 전역 스타일 (global.css)
│   └── content/        # (Optional) 콘텐츠 컬렉션 (Markdown/MDX)
├── astro.config.mjs    # Astro 설정
└── package.json
```

## 5. Security Strategy (보안 전략)
- **HTTPS 강제**: 운영 배포 시 반드시 HTTPS를 사용합니다.
- **Rel attributes**: 외부 링크 사용 시 `rel="noopener noreferrer"`를 명시하여 보안 위협을 차단합니다.
- **Sanitization**: 사용자 입력(Form 등)이 있을 경우 반드시 살균(Sanitize) 처리를 수행합니다.

## 6. Automation (자동화)
- `npm run dev`: 로컬 개발 서버 구동.
- `npm run build`: 프로덕션용 정적 파일 빌드 (`dist/`).
- `npm run preview`: 빌드 결과물 미리보기.

---
**Note**: 이 지침은 프로젝트 진행 상황에 따라 업데이트될 수 있습니다.
