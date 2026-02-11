---
trigger: always_on
---

---
description: Describe when these instructions should be loaded

---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.
1. Project Structure
Use feature-based folder architecture: src/ ├─ app/ (or pages/) ├─ components/ ├─ features/ ├─ services/ ├─ hooks/ ├─ utils/ ├─ types/ ├─ context/ ├─ lib/ ├─ assets/ └─ environments/
Use app/ directory for Next 13+ (Server Components + Client Components).
Keep reusable components under components/ui/.
Use lib/ for wrappers (e.g., Axios client, external API helpers).
Place global styles in styles/ (Tailwind recommended).
Maintain naming conventions (PascalCase components, camelCase functions).
Keep configuration files under config/ (API endpoints, constants).
Store Next.js middleware, route handlers and server logic under app/api/.
2. Component Development
Prefer Server Components for performance when UI is static.
Use Client Components only when interactivity is needed ("use client").
Use functional components with TypeScript props: ts export default function Button({ label }: { label: string }) { return <button>{label}</button>; }
Memoize with React.memo, useCallback, useMemo.
Extract business logic into custom hooks.
Avoid heavy logic inside JSX.
Use Error Boundaries for client-side error handling.
Ensure all components are reusable and cleanly separated.
3. Services & API Communication
Use Axios as the standard HTTP client for all service interactions.
Create a centralized Axios instance in lib/axios.ts: ```ts import axios from 'axios';
export const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL, timeout: 10000, headers: { 'Content-Type': 'application/json' } });

api.interceptors.request.use((config) => { // Add authorization headers if needed // config.headers['Authorization'] = Bearer ${token}; return config; }); 3. Use TypeScript generics for typed API responses.ts export const getUsers = () => api.get<User[]>("/users"); ``` 4. Create services inside services/ folder with clear separation per domain. 5. Avoid calling Axios directly from components — always use service functions. 6. Use Next.js server actions when backend access must be secure. 7. Use react-query or swr with Axios for automated caching and revalidation. 8. Ensure compatibility with Next.js latest LTS version (Next.js 14+ App Router).

4. State Management
Use React Context for global UI state.
Use Redux Toolkit for large-scale global state.
Use Zustand for lightweight global state.
Keep state slices in store/.
Use typed selectors and dispatch.
Avoid storing ephemeral UI state globally.
Reset store on logout.
Combine server state (fetch) with client state properly.
5. Routing & Navigation
Use App Router (app/) with file-based routing.
Create route groups for module separation: app/(dashboard)/page.tsx
Use useRouter() for client-side navigation.
Use dynamic routes [id] for detail pages.
Handle 404 with not-found.tsx.
Use loading.tsx for global/route-level loaders.
Use middleware for authentication & URL rewriting.
Manage layout using layout.tsx per route group.
6. Forms Handling
Use React Hook Form for efficient form handling.
Validate using Zod or Yup.
Create reusable input components.
Use Server Actions (Next 13+) for secure form submissions.
Validate in both UI & server.
Reset form state after submit.
Use optimistic updates when required.
Avoid unnecessary state in forms; rely on RHF internal state.
7. Error Handling
Use error.tsx files for route-level error boundaries.
Use not-found.tsx for 404 errors.
Log backend/server errors via server logs.
For client errors, use try/catch inside hooks.
Show user-friendly messages.
Use Sentry for monitoring.
Handle API errors in services/.
Ensure isolated error handling at component and route level.
8. Performance Optimization
Prefer Server Components to reduce JS bundle size.
Use next/image for optimized images.
Use next/font for font optimization.
Cache API responses with Next.js caching.
Avoid client components unless necessary.
Split code using dynamic imports. ts const Chart = dynamic(() => import('./Chart'), { ssr: false });
Use memoization to prevent re-renders.
Analyze bundles using next build output.
9. Reusable UI Components
Place components under components/ui/.
Use TailwindCSS for styling.
Create wrapper components for common UI patterns.
Keep UI components purely presentational.
Document components via Storybook.
Use props for configurability.
Avoid inline styling except Tailwind utility classes.
Provide variants using class merging utilities like clsx.
10. Security Best Practices
Use HTTP-only cookies for auth tokens.
Validate inputs on server actions.
Sanitize any dynamic HTML.
Use middleware for authentication.
Avoid exposing secrets—only NEXT_PUBLIC_* is allowed on client.
Enable HTTPS.
Apply rate limiting (Edge Middleware or API Gateway).
Store secrets in environment variables, never in Git.
11. Testing Best Practices
Use Jest + React Testing Library for units.
Mock Next.js router using libraries like next-router-mock.
Test Server Components using custom render wrappers.
Mock fetch using MSW.
Test client components using RTL.
Maintain >80% coverage.
Write integration tests for critical flows.
Automate tests in CI.
12. Linting & Code Quality
Use ESLint with Next.js recommended config.
Use Prettier for formatting.
Enable TypeScript strict mode.
Follow naming conventions.
Avoid any type.
Run lint checks in CI.
Use pre-commit hooks.
Document complex functions.
13. Build & Deployment
Use next build for production optimization.
Use .env files for different environments.
Deploy with Vercel, AWS Amplify, Netlify, or Docker.
Use environment-based builds via .env.production, .env.local, .env.uat.
Optimize images using Next.js built-in CDN.
Use VERCEL_ENV / NODE_ENV in CI.
Clean unused imports before build.
Cache Next.js output for faster CI builds.
14. Event Handling & Lifecycle
Use useEffect only in Client Components.
Cleanup subscriptions in useEffect return.
Use useRef for stable mutable values.
Avoid memory leaks by canceling fetch requests.
Use Server Actions to reduce client event complexity.
Debounce expensive event handlers.
Abstract complex event logic into hooks.
Use requestAnimationFrame for heavy UI updates.
15. Theming & UI Consistency
Use TailwindCSS for styling.
Use CSS Variables for theme switching.
Keep base theme configuration in styles/theme.css.
Consistent UI with design tokens.
Build a theme provider if using client-only theming.
Integrate third-party UI kits with Tailwind.
Standardize typography and spacing.
Use dark mode via Tailwind or next-themes.
16. Environment Management (Local, Dev, UAT, Prod)
Create separate env files: .env.local .env.development .env.uat .env.production
Always prefix client-exposed variables with: NEXT_PUBLIC_*
Example env file: NEXT_PUBLIC_API_URL="https://api.dev.example.com" NEXTAUTH_SECRET="secure-key"
Use runtime environment switching via process.env.
Never commit .env.local — keep .env.example instead.
Inject env variables during CI/CD pipeline.
For Docker builds: bash docker build --build-arg NEXT_PUBLIC_API_URL=https://uat.api.example.com .
Use Vercel env groups for cloud deployments.
s