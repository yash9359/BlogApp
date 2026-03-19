# BlogApp

A modern full-stack blogging platform built with React + Vite, using Appwrite for authentication, database, and file storage.

## Features

- User signup, login, and logout
- Protected routes using auth state
- Create, edit, delete, and view posts
- Rich text editor (TinyMCE) for blog content
- Featured image upload to Appwrite Storage
- Post status control (`active` / `inactive`)
- Responsive UI built with Tailwind CSS

## Tech Stack

- React 19
- Vite 7
- React Router
- Redux Toolkit + React Redux
- React Hook Form
- Tailwind CSS 4
- Appwrite SDK
- TinyMCE React Editor

## Project Structure

```text
BlogApp/
├── Components/
│   ├── Header/
│   ├── Footer/
│   ├── PostForm/
│   └── ...
├── Pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── SignUp.jsx
│   ├── AllPosts.jsx
│   ├── AddPost.jsx
│   ├── EditPost.jsx
│   └── Post.jsx
├── src/
│   ├── appwrite/
│   │   ├── auth.js
│   │   └── conf.js
│   ├── config/
│   │   └── config.js
│   └── Store/
├── .env.sample
├── package.json
└── vite.config.js
```

## Getting Started

### 1) Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm
- Appwrite project (Cloud or self-hosted)

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables

Copy `.env.sample` to `.env` and fill in your Appwrite values:

```env
VITE_APPWRITE_URL="https://your-appwrite-endpoint/v1"
VITE_APPWRITE_PROJECT_ID="your_project_id"
VITE_APPWRITE_DATABASE_ID="your_database_id"
VITE_APPWRITE_COLLECTION_ID="your_collection_id"
VITE_APPWRITE_BUCKET_ID="your_bucket_id"
```

### 4) Run the app

```bash
npm run dev
```

Vite will start the development server (usually at `http://localhost:5173`).

## Appwrite Setup Notes

Create these resources in Appwrite:

1. **Project**
2. **Database**
3. **Collection** for blog posts (use document ID as slug)
4. **Storage Bucket** for featured images

Suggested post fields:

- `title` (string)
- `slug` (string)
- `content` (string)
- `featuredImage` (string)
- `status` (string)
- `userId` (string)

Also configure collection and bucket permissions so authenticated users can create and manage their own content.

## Available Scripts

- `npm run dev` — start development server
- `npm run build` — build for production
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

## Route Overview

- `/` → Home
- `/login` → Login
- `/signup` → Sign up
- `/all-posts` → All posts (protected)
- `/add-post` → Create post (protected)
- `/edit-post/:slug` → Edit post (protected)
- `/post/:slug` → Single post

## Notes

- Authentication state is persisted via Appwrite session and synced to Redux on app load.
- Rich text content is stored as HTML and rendered in the post details page.

---

If you like this project, feel free to fork it and customize it for your own blogging platform.
