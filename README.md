# Forum App

A modern forum application built with **React**, **Vite**, **TypeScript**, and **MUI**, featuring client-side authentication simulation, post creation, comments, and user management.

## Live Demo

[https://VladislavTatur.github.io/forum](https://VladislavTatur.github.io/forum)

---

## Features

- **Posts and comments** with creation, filtering, and pagination.
- **User management** with profile and settings pages.
- **Client-side authentication simulation** using `localStorage`.
- **Routing** with protected and public routes using React Router v7.
- **State management** with Redux Toolkit and React Redux.
- **Form handling** using React Hook Form.
- **UI** built with MUI (Material UI).

---

## Getting Started

### Installation

```bash
git clone https://github.com/VladislavTatur/forum.git
cd forum
yarn install
yarn dev
```

The app will run on http://localhost:5173 by default.

## Login

For authentication simulation, a predefined user is stored in localStorage.
Use the following credentials to log in:
```
Username: bradF1
Password: 123456
```
>Only authenticated users can create posts, like or dislike it and leave comments.

---

## Tech Stack

- React 19 – frontend library
- TypeScript 5 – static typing
- React Router 7 – routing
- Redux Toolkit & React Redux – state management
- MUI v7 – UI components and styling
- React Hook Form – form handling
- Vite – build tool

### Linting & Formatting
- ESLint with plugins for React, JSX accessibility, and TypeScript.
- Prettier for code formatting.
- Husky & lint-staged for pre-commit hooks:
```
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  }
}
```
> Automatically formats and lints code before commit.

### Project Structure

```
src/
├─ features/         # Posts, comments, users
├─ pages/            # App pages (Login, Profile, Posts, etc.)
├─ shared/           # Shared utils, constants, layouts, components, etc.
├─ store/            # Redux slices, selectors and store configuration
├─ App.tsx           # Main app
└─ main.tsx          # Entry point
```

## Deployment
The app is deployed to GitHub Pages:

```
yarn build
yarn deploy
```

### Notes

- Authentication is simulated using localStorage.
- The app uses lazy loading for route-based code splitting.
- Protected routes prevent access to profile and settings pages if the user is not authenticated.
- Comments and post creation are restricted to logged-in users only.