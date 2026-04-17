# 프론트엔드 설정 가이드 — AgileFlow

## 초기 설정 명령어
```bash
npm create vite@latest web -- --template react
cd web
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install react-router-dom zustand @tanstack/react-query react-hook-form zod @hookform/resolvers
npm install react-markdown rehype-highlight remark-gfm
npm install axios eventsource-parser
```

## Tailwind 다크 테마 설정 (tailwind.config.js)
```js
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: { 500: '#6366F1', 600: '#4F46E5', 400: '#818CF8' },
        surface: {
          base: '#0A0A0F',
          raised: '#111118',
          overlay: '#1C1C27',
          border: '#2A2A3A',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
}
```

## 환경 변수 (.env)
```
VITE_API_URL=http://localhost:3001/api/v1
VITE_APP_NAME=AgileFlow
```
