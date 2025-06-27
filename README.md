# Someting new

![CI](https://github.com/PieterJDSw/wizards/actions/workflows/ci.yml/badge.svg?branch=main)
[![Netlify Status](https://api.netlify.com/api/v1/badges/5d4ea794-b538-40d4-9027-858eb8ec894c/deploy-status)](https://app.netlify.com/projects/gorgeous-gaufre-50e360/deploys)
[![Readme Card Stats](https://github-readme-stats.vercel.app/api/pin/?username=PieterJDSw&repo=wizards)](https://github.com/PieterJDSw/wizards)

---

## Overview

**Wizarding world** .

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure & Views](#project-structure--views)
- [Getting Started](#getting-started)
- [Development Practices](#development-practices)
- [Husky & Linting](#husky--linting)
- [GitHub Actions & CodeQL](#github-actions--codeql)
- [Contributing](#contributing)

---

## Tech Stack

- **Vue 3**: Progressive JavaScript framework
- **TypeScript**: Static typing for maintainability
- **Pinia**: State management
- **PrimeVue**: UI component library
- **TailwindCSS**: Utility-first CSS framework
- **Vue Router**: SPA routing
- **@tanstack/vue-query**: Data fetching and caching
- **Supabase**: Backend as a service (database, auth)
- **Clerk**: Authentication
- **Sentry**: Error monitoring
- **Vitest**: Unit testing
- **Husky**: Git hooks for linting and formatting
- **GitHub Actions**: CI/CD and CodeQL analysis

---

## Project Structure & Views

### Main Views

- **HomeView**: Landing page with animated intro and navigation cards.
- **HousesView**: Browse all Hogwarts houses, view details, and see house members with rich character cards.
- **SpellsView**: Explore spells, filter/search, view spell details (including incantation, light color, etc.).
- **SpellDetailsView**: Detailed view for a single spell, showing all available properties.
- **ElixirsView**: List and filter magical elixirs, view details and ingredients.
- **LeaderBoard**: House points leaderboard and quiz/trivia section for awarding points.
- **AuthView**: Authentication (Sign Up/Sign In) via Clerk.

### Components

- **WizardMenuCard**: Animated navigation cards for main sections.
- **AppHeader**: Simple, styled header.
- **AdminSpells**: (Optional) Admin table for managing spells.
- **LottieAnimation**: For animated illustrations.

### State Management

- **Pinia stores**: `wizardingWorld` (houses, spells, characters, etc.), `userStore` (auth state).

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/PieterJDSw/wizards.git
   cd wizards
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Environment variables:**

   - Copy `.env.example` to `.env` and fill in required values (e.g., Clerk publishable key).

4. **Run the development server:**

   ```sh
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173) (or as indicated in the terminal).

5. **Run tests:**

   ```sh
   npm run test:unit
   ```

6. **Build for production:**
   ```sh
   npm run build
   ```

---

## Development Practices

- **TypeScript everywhere:** All components and stores use TypeScript for type safety.
- **Pinia for state:** Use Pinia stores for all shared state (houses, spells, user, etc.).
- **Composition API:** All Vue components use `<script setup>` and the Composition API.
- **Component-based UI:** Use PrimeVue and TailwindCSS for consistent, responsive design.
- **API abstraction:** All API calls are in the `/api` directory.
- **Error handling:** Errors are surfaced in the UI and reported to Sentry.
- **Testing:** Use Vitest and Vue Test Utils for unit/component tests.
- **Accessibility:** Use semantic HTML and accessible components where possible.

---

## Husky & Linting

- **Husky** is configured to run ESLint and Prettier on every commit via `lint-staged`.
- **ESLint** checks for code quality and style issues, including TypeScript-specific rules.
- **Prettier** auto-formats code for consistency.
- **How it works:**  
  On `git commit`, Husky runs `eslint --fix` and `prettier --write` on staged files. If any issues are found, the commit is blocked until fixed.

---

## GitHub Actions & CodeQL

- **CI Workflow:**

  - Runs on every push and pull request.
  - Installs dependencies, runs type checks, lints, and unit tests.
  - Deploys to Netlify on main branch.

- **CodeQL Analysis:**
  - Runs static code analysis for security vulnerabilities and code quality.
  - Results are available in the GitHub Security tab.

---

## Contributing

- Fork the repo and create a feature branch.
- Write clear, concise commits.
- Ensure all code is typed, tested, and linted.
- Open a pull request with a description of your changes.

---

## Good Practices for Vue in This Project

- Use `<script setup lang="ts">` for all components.
- Avoid using `any`—always specify types.
- Use Pinia for all shared state.
- Keep components small and focused.
- Use async/await for all API calls.
- Handle loading and error states in the UI.
- Use Tailwind utility classes for layout and spacing.
- Prefer computed properties and watchers for reactive logic.
- Use Husky and lint-staged to catch issues before pushing code.
- Write and maintain unit/component tests.

---

## License

MIT

---

**Enjoy exploring the wizarding world!** 🧙‍♂️✨
