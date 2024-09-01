# Blog Management Client

This project is a frontend application built using Next.js 14 with the App Router. It features a blog module that allows users to create, edit, view, and search blog posts with categories.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Features](#features)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18 or higher)
- npm or yarn

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/thebishaldeb/imversion-client.git
   cd imversion-client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

## Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:

```env
NEXT_PUBLIC_SCHEMA=http://localhost:4000/graphql
```

- `NEXT_PUBLIC_SCHEMA`: The URL of the GraphQL API endpoint.

## Running the Project

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

## Features

- **Blog Module:**

  - Create blog posts with markdown support.
  - Categorize blog posts and filter them based on categories.
  - Pagination support for viewing multiple blog posts.
  - SSR support for rendering blogs efficiently.

- **UI/UX:**
  - Built using Shadcn and Tailwind CSS for a modern and responsive design.
  - Markdown rendering using `react-markdown`.

---
