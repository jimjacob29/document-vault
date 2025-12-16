# AI Document Vault (Frontend Prototype)

A modern, responsive document management dashboard built with **Next.js**, **React**, and **Tailwind CSS**. This prototype demonstrates a premium user interface for uploading, managing, and analyzing documents with AI-powered features.

## 🚀 Key Features

- **Modern UI/UX**: clean, "hacker-style" dark theme layout using Tailwind CSS.
- **Drag & Drop Upload**: Integrated file upload zone with visual feedback states.
- **Document Preview**:
  - **PDF Viewer**: Native iframe integration for viewing original documents.
  - **AI Summary**: Mock AI analysis for generating executive summaries.
  - **Markdown View**: Clean code-like view for structured document content.
- **Interactive Dashboard**: Real-time analytics charts (total docs, storage, type distribution).
- **Responsive Design**: Mobile-friendly sidebar and layout.
- **Dynamic Data**: Mock APIs simulating backend data fetching for documents and user profiles.

## 🛠 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React Framework)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS)
- **Icons**: [Lucide React](https://lucide.dev/) (Consistent, clean SVG icons)
- **Utilities**: `clsx` for conditional class management.
- **File Handling**: `formidable` (API side) for managing file uploads.

## 🏗 Component Architecture

The application is structured for modularity and reusability:

- **Pages**:
  - `pages/index.js`: Main document list and upload area.
  - `pages/dashboard.js`: Analytics overview.
  - `pages/document/[id].js`: Detail view with tabbed interface.
- **Components**:
  - `Layout.js`: App shell with sidebar navigation and dynamic user profile.
  - `DocumentList.js`: Reusable list item component with dropdown actions.
  - `Loader.js`: Unified loading spinner.
  - `tabs/`: Modular tab content (`SummaryTab`, `MarkdownTab`, `OriginalTab`).

## 💻 Getting Started

1.  **Install dependencies**:

    ```bash
    npm install
    # or
    yarn install
    ```

2.  **Run the development server**:

    ```bash
    npm run dev
    ```

3.  **Open the app**:
    Visit [http://localhost:3000](http://localhost:3000)

## 🎨 Theme

The project uses a custom theme by default:

- **Backgrounds**: Zinc 900/950 (`#0a0a0a`)
- **Accents**: Indigo & Blue gradients
- **Typography**: High-contrast light text for readability.

## 📝 API Endpoints (Prototype)

- `GET /api/documents`: List all uploaded files.
- `POST /api/upload`: Handle file storage.
- `GET /api/user`: Fetch current user details.
- `POST /api/process`: Simulate AI processing.
