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

## 🧠 Design Choices & Assumptions

### Design Decisions

1.  **Component-Based Architecture**: UI elements like `DocumentList`, `Loader`, and Tabs are extracted into reusable components to maintain a clean `pages/index.js` and separation of concerns.
2.  **Client-Side Navigation**: Used Next.js `Link` and `useRouter` for seamless SPA-like transitions without full page reloads.
3.  **Optimistic UI**: Simple loading states are used (spinners/skeletons) to provide immediate feedback during async operations (upload/delete).

### Assumptions

- **Local Storage**: For this prototype, files are stored locally in `public/uploads`. In a production environment, this would be replaced by an S3/Blob storage solution.
- **Mock AI**: The "AI Summary" feature uses a mock delay and hardcoded response to simulate LLM processing without incurring API costs during review.
- **Single User**: The current `user` API is mocked for a single admin user context.
- **Browser Support**: Tested primarily on modern Chrome browser.

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
