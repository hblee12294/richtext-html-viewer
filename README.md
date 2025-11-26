# RichText HTML Viewer

A powerful web application that bridges the gap between visual rich text editing and raw HTML code manipulation. This tool allows you to edit content using a familiar WYSIWYG interface while simultaneously viewing and editing the generated HTML source code.

## Features

- **Dual Editing Modes**:
  - **Rich Text Editor**: Powered by [Quill](https://quilljs.com/), offering a comprehensive set of formatting tools (bold, italic, lists, links, images, etc.).
  - **Code Editor**: Powered by [Monaco Editor](https://microsoft.github.io/monaco-editor/) (VS Code's editor), providing syntax highlighting and code editing capabilities for the HTML source.
- **Real-time Synchronization**: Edits made in the visual editor are immediately reflected in the code view, and vice versa.
- **Live Preview**: Toggle the code view to see a rendered preview of your HTML content.
- **File Management**:
  - **Upload**: Load existing HTML files directly into the editor.
  - **Download**: Save your work as an `.html` file.
- **Content Statistics**: Track character and word counts in real-time.
- **Responsive Layout**: Adjustable split-screen view to customize your workspace.

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hblee12294/richtext-html-viewer.git
   cd richtext-html-viewer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes.

### Building for Production

To build the app for production:

```bash
npm run build
```

This builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Deployment

This project is configured to be deployed to GitHub Pages.

To deploy the latest build:

```bash
npm run deploy
```

This script runs the build command and then deploys the `build` directory to the `gh-pages` branch.

## Technologies Used

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Quill](https://quilljs.com/)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Highlight.js](https://highlightjs.org/)
