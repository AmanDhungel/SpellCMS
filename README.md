# SpellCMS

SpellCMS is a modern content management system (CMS) built with React, TypeScript, and Vite. It provides a fast development experience, hot module replacement (HMR), and a robust linting setup for scalable, maintainable code.

## Features

- ⚡️ **Vite-powered**: Lightning-fast development and build times.
- ⚛️ **React + TypeScript**: Type-safe, component-driven UI development.
- 🔥 **HMR**: Instant feedback with Hot Module Replacement.
- 🧹 **ESLint Integration**: Pre-configured with recommended and type-aware linting rules.
- 🧩 **Plugin Support**: Easily extendable with official and community plugins.

## Getting Started

1. **Install dependencies:**

```bash
npm install
```

2. **Start the development server:**

```bash
npm run dev
```

3. **Run JSON Server:**

```bash
json-server --watch src/data/db.json
```

4. **Build for production:**

```bash
npm run build
```

## Implemented Features

- 🔑 **Login with Token**: Secure authentication mechanism using tokens for user login.
- 📝 **CRUD Operations in Blog**: Full Create, Read, Update, and Delete functionality for managing blog posts.
- 👤 **CRUD Operations in Author**: Manage author details with comprehensive CRUD operations.
- 📂 **CRUD Operations in Category**: Organize and manage categories with complete CRUD capabilities.

## ESLint Configuration

SpellCMS comes with a minimal ESLint setup. For production-grade applications, enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [...tseslint.configs.recommendedTypeChecked],
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

```js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```

---

Feel free to contribute or open issues to help improve SpellCMS!
