<div align="center">

# Task Manager

[![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Framework](https://img.shields.io/badge/Framework-React%2019-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Build Tool](https://img.shields.io/badge/Build-Vite%208-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![AI Provider](https://img.shields.io/badge/AI-None-lightgrey)](#)
[![License](https://img.shields.io/badge/License-Not%20Specified-lightgrey)](#license)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](#docker-deployment-optional)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)

**A focused single-page task tracker built with React, Context + Reducer state management, and route-based task details.**

[Live Demo](#) · [Report Bug](../../issues/new?template=bug_report.md) · [Request Feature](../../issues/new?template=feature_request.md)

</div>

## About

Task Manager is a lightweight productivity app for creating, filtering, updating, and deleting tasks in a clean list/detail workflow. It uses React Router for navigation and Context + Reducer for predictable state transitions. Task data is persisted in browser localStorage so your updates survive page refreshes.

### Key Features

| Feature | Description |
|---|---|
| Task list view | Browse all tasks with total and completed counters |
| Status filtering | Filter by `all`, `todo`, `in-progress`, and `done` |
| Task details route | Open `/tasks/:id` to inspect and manage one task |
| In-place editing | Edit title, description, status, and priority |
| Delete workflow | Remove tasks with a confirmation step |
| Local persistence | Save changes to localStorage (`tasks_local_override`) |

## Tech Stack

| Category | Technology |
|---|---|
| Frontend | React 19, JSX, CSS Modules |
| Routing | React Router DOM 7 |
| State Management | React Context API + `useReducer` |
| Backend | None (client-side only) |
| AI/LLM | None |
| Database | Browser localStorage |
| Tooling | Vite 8, ESLint 10 |
| Deployment | Vercel / Netlify / Static hosting |
| Document Processing | Not applicable |

## Architecture

```text
+-----------------------------+
|        Browser (UI)         |
|  Header, TaskListPage,      |
|  TaskDetailPage, Forms      |
+-------------+---------------+
				  |
				  v
+-----------------------------+
|   App Routing Layer         |
|   BrowserRouter + Routes    |
|   /tasks, /tasks/:id        |
+-------------+---------------+
				  |
				  v
+-----------------------------+
|  State Layer (Application)  |
|  TaskProvider (Context)     |
|  taskReducer (actions)      |
+-------------+---------------+
				  |
				  v
+-----------------------------+
| Persistence/Data Layer      |
| localStorage override key   |
| fallback mockTasks seed     |
+-----------------------------+
```

## Project Structure

```text
task-manager/
|- public/
|- src/
|  |- assets/
|  |- components/
|  |  |- AddTaskForm.jsx
|  |  |- FilterBar.jsx
|  |  |- FilterBar.module.css
|  |  |- Header.jsx
|  |  |- Header.module.css
|  |  |- TaskList.jsx
|  |  |- TaskList.module.css
|  |- contexts/
|  |  |- TaskContext.jsx
|  |- pages/
|  |  |- TaskDetailPage.jsx
|  |  |- TaskDetailPage.module.css
|  |  |- TaskListPage.jsx
|  |- reducers/
|  |  |- taskReducer.js
|  |- App.css
|  |- App.jsx
|  |- index.css
|  |- main.jsx
|- eslint.config.js
|- index.html
|- package.json
|- vite.config.js
|- README.md
```

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)
- npm 10+ (or compatible package manager)

### Installation

```bash
git clone https://github.com/ngys9919/ntu-aie-m2
cd ntu-aie-m2
npm install
```

### Environment Setup

No environment variables are required for the current version.

### Run the App

```bash
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

### Other Scripts

```bash
npm run lint      # Run ESLint
npm run build     # Create production build
npm run preview   # Preview production build locally
```

## Deployment

### Docker Deployment (Optional)

You can containerize this Vite app with a multi-stage Docker build.

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve static files
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:

```bash
docker build -t task-manager .
docker run -p 8080:80 task-manager
```

### Vercel Deployment

1. Push repository to GitHub.
2. Import the project in Vercel.
3. Use default build settings for Vite:
	- Build command: `npm run build`
	- Output directory: `dist`
4. Deploy.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes with clear commit messages.
4. Run lint/build checks locally.
5. Open a Pull Request with a clear description.

Use GitHub Discussions/Issues for questions and proposals.

## Developed By

>> Coder: **Ng Yew Seng (353F)**

>> NTU SCTP AI Engineering

>> for Module 2: Frontend Web Development

>> © Copyright 2026

## Acknowledgements

- React team for the component model and hooks ecosystem.
- Vite team for fast local development and modern build tooling.
- React Router contributors for declarative client-side routing.

## License

No license file is currently included in this repository. Add a `LICENSE` file (for example, MIT) if you plan to distribute or open source this project.

---

If this project helped you, consider starring the repository.
