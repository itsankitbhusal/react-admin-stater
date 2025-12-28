# React Admin - Starter Project

A modern React application built with TypeScript, Vite, and TanStack Query. This starter project provides a robust foundation for building scalable backoffice applications.

## 🚀 Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router](https://reactrouter.com/)
- **State Management / Data Fetching**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **UI Components**: [Ant Design](https://ant.design/) + [React Icons](https://react-icons.github.io/react-icons/)
- **Internationalization**: [i18next](https://www.i18next.com/)

## 📂 Project Structure

```
src/
├── api/          # API integration and Axios setup
├── assets/       # Static assets (images, fonts)
├── components/   # Shared UI components
├── constants/    # Global constants (API URLs, keys)
├── features/     # Feature-based modules (Auth, etc.)
├── hooks/        # Custom React hooks
├── lib/          # Library configurations (QueryClient, etc.)
├── pages/        # Page components (routed views)
├── routes/       # Route definitions
├── types/        # TypeScript type definitions
└── utils/        # Utility functions (logger, etc.)
```

## 🛠️ Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd pn-backoffice
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Environment Setup:**
    Duplicate `.env.example` to `.env` and configure your environment variables.
    ```bash
    cp .env.example .env
    ```

4.  **Run Development Server:**
    ```bash
    npm run dev
    ```

## 📜 Scripts

- `dev`: Starts the development server.
- `build`: Compiles the application for production.
- `lint`: Runs ESLint to check for code quality issues.
- `preview`: Previews the built application locally.

---

# 🏗️ Architecture Overview

## Technology Choices

### Core Framework
- **React 19**: The latest version of the UI library.
- **Vite**: Build tool for fast development and optimized production builds.

### State Management & Data Fetching
- **TanStack Query (React Query)**: Used for server state management. It handles caching, synchronization, background updates, and error handling for API requests. We generally avoid using global client-state managers (like Redux) for server data.

### Routing
- **React Router 7**: Standard routing library. Routes are defined in `src/routes/routes.tsx`.

### Styling
- **Tailwind CSS**: Utility-first CSS framework for layout and spacing.
- **Ant Design**: Component library for complex UI elements (Forms, Tables, Modals).

### Form Handling
- **React Hook Form**: For performant, uncontrolled form validation.
- **Zod**: Schema validation library used to define strict types for forms and API responses.

## Folder Structure Pattern

The project follows a **Feature-based** architecture combined with a **Layered** architecture for shared resources.

- **`features/`**: Contains domain-specific code. Each feature (e.g., `Auth`) should ideally be self-contained with its own components, hooks, and schemas.
- **`components/`**: Shared "dumb" UI components that are reusable across multiple features.
- **`pages/`**: Thin wrappers that correspond to routes. They usually compose Feature components together.
- **`api/`**: The Data Access Layer. Contains raw Axios calls.
- **`hooks/queries/`**: The Service Layer adaptation for React. Wraps `api` calls in TanStack Query hooks (`useQuery`, `useMutation`).

## Data Flow

1. **User Interaction**: User interacts with a Component (e.g., `LoginForm` in `features/`).
2. **Form Handling**: `react-hook-form` captures input and validates against `zod` schema.
3. **Service Layer**: The component calls a custom hook (e.g., `useLogin` from `hooks/queries/`).
4. **Network Request**: The hook calls the API function (from `api/`).
5. **HTTP Client**: `axios` instance sends the request, handling base URLs and global errors.
6. **State Update**: TanStack Query updates the cache, `isLoading`, `isError` states, which flow back down to the UI.

---

# 📖 File Reference

This document provides a comprehensive guide to the files in the project.

## Root Directory

### `README.md`
- **Purpose**: The entry point for documentation. Contains project overview, setup instructions, tech stack details, architecture, and file reference.

### `package.json`
- **Purpose**: Defines project dependencies and scripts.
- **Details**:
    - **Scripts**: `dev` (start server), `build` (tsc + vite build), `lint` (eslint).
    - **Key Dependencies**: React 19, Vite, TanStack Query, Ant Design, TailwindCSS, React Hook Form, Zod.

### `vite.config.ts`
- **Purpose**: Configuration for the Vite build tool.
- **Details**: Sets up plugins (likely React) and build options.

### `env.ts` (`src/env.ts`)
- **Purpose**: Type-safe environment variable validation.
- **Details**: Uses `@t3-oss/env-core` and `zod` to ensure required environment variables (like `VITE_BASE_URL` and `VITE_ENV`) are present and correctly typed.

## `src/` Directory

### Key Files

#### `main.tsx`
- **Purpose**: The entry point of the React application.
- **Details**: Mounts the `App` component into the DOM. Handles strict mode.

#### `App.tsx`
- **Purpose**: The root component of the application.
- **Details**:
    - Sets up providers: `QueryClientProvider` (TanStack Query), `RouterProvider` (React Router).
    - Renders the `ReactQueryDevtools` for debugging.

#### `index.css`
- **Purpose**: Global styles.
- **Details**: Likely imports Tailwind directives.

### `src/api/`

#### `axios.ts`
- **Purpose**: Configures the global HTTP client.
- **Details**:
    - Exports an `api` instance of Axios.
    - **Base URL**: Loaded from `env.VITE_BASE_URL`.
    - **Interceptors**: Global error handling. Formats error responses into a standardized object with `message`, `status`, `type`, and `errors`.

#### `auth/auth.api.ts`
- **Purpose**: Database/Server API calls related to Authentication.
- **Details**: Contains the `login` function that makes a POST request to `/api/v1/auth/login`.

#### `auth/auth.types.ts`
- **Purpose**: TypeScript definitions for Auth API data.
- **Details**: Defines interfaces like `ILoginRequest`.

### `src/features/`

#### `Auth/Login/index.tsx`
- **Purpose**: The Login Page UI.
- **Details**:
    - Uses **React Hook Form** with **Zod** validation (`loginSchema`).
    - Uses **Ant Design** components (`Form`, `Input`, `Button`).
    - Calls `useLogin` hook to handle the actual login logic.
    - Handles form submission and loading states.

#### `Auth/Login/schema/login.schema.ts`
- **Purpose**: Validation rules for the login form.
- **Details**:
    - Uses Zod to define `loginSchema`.
    - Rules: `username` and `password` are required strings. `remember` is an optional boolean.
    - Exports `LoginFormValues` type inference.

### `src/hooks/queries/`

#### `Auth/index.ts`
- **Purpose**: React Query hooks for Auth features.
- **Details**:
    - Exports `useLogin` custom hook.
    - Uses `useMutation` to handle the login API call.
    - Handles `onSuccess` (logging) and `onError` (showing Ant Design error messages and logging).

### `src/lib/`

#### `queryClient.ts`
- **Purpose**: Configuration for TanStack Query Client.
- **Details**:
    - Sets global defaults for queries:
        - `staleTime`: 5 minutes.
        - `gcTime`: 30 minutes.
        - `retry`: 2 times with exponential backoff.
        - `refetchOnWindowFocus`: False.

### `src/routes/`

#### `routes.tsx`
- **Purpose**: Defines the application's route structure.
- **Details**:
    - Mapping of URL paths to Components.
    - `/` -> `Home`
    - `*` -> `NotFound` (Catch-all for 404s)

### `src/utils/` & `src/logger/`

#### `logger/index.ts`
- **Purpose**: A custom logging utility.
- **Details**:
    - Wraps `console.log`, `console.info`, `console.error`.
    - Adds timestamps and log levels.
    - **Production Safety**: `log` level is suppressed in production (`VITE_ENV === 'prod'`).

### `src/constants/`

#### `apiUrls.ts`
- **Purpose**: Centralized registry of API endpoints.
- **Details**: Keeps strings like `/api/v1/auth/login` in one place to avoid magic strings in components.
