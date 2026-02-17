# WorldWise 🌍

A modern web application for travelers to track and visualize the countries they've visited. Mark your travels on an interactive world map, keep notes about your visits, and explore the stories of your travels all in one place.

## Features

- 📍 Interactive world map to mark visited countries
- 🗺️ Click on the map to add new city visits with dates and notes
- 🌐 View a list of all visited countries with flags
- 📱 Responsive design for desktop and mobile devices
- 🔐 User authentication for personalized travel logs
- 📊 Track your travel statistics

## Deployment to GitHub Pages

This project is configured to automatically deploy to GitHub Pages when you push to the `main` branch.

### Setup

1. Make sure your repository is public or has GitHub Pages enabled in settings
2. In your repository settings, go to **Settings > Pages**
3. Select **Deploy from a branch**
4. Choose `gh-pages` as the branch and `/root` as the folder

### How it Works

- A GitHub Actions workflow automatically builds and deploys your project on every push to `main`
- The workflow runs `npm run build` and deploys the `dist` folder to the `gh-pages` branch
- Your site will be available at: `https://<your-github-username>.github.io/worldwise/`

### Manual Deployment

If you prefer to deploy manually:

```bash
npm run build
npm run deploy
```

> Note: You may need to install `gh-pages` package to use the deploy script

## Technologies & Libraries

### Core Framework

- **React** (^19.1.1) - UI library for building interactive user interfaces
- **React DOM** (^19.1.1) - Package for rendering React components in the browser
- **TypeScript** (~5.9.3) - Typed superset of JavaScript for enhanced code safety

### Build & Development Tools

- **Vite** (^7.1.7) - Lightning-fast frontend build tool and development server
- **@vitejs/plugin-react** (^5.0.4) - Vite plugin for React with Fast Refresh support

### Routing & State Management

- **React Router DOM** (^7.9.4) - Client-side routing library for navigation and page management
- **Context API** - Built-in React feature for state management

### UI & Styling

- **React Leaflet** (^5.0.0) - React wrapper for Leaflet.js, interactive mapping library
- **Leaflet** (^1.9.4) - Open-source JavaScript library for mobile-friendly interactive maps
- **flag-icons** (^7.5.0) - SVG country flag icons collection

### Form & Date Handling

- **React DatePicker** (^8.9.0) - Simple date picker component for React

### Development & Quality Tools

- **ESLint** (^9.36.0) - JavaScript linter for code quality and consistency
- **@eslint/js** (^9.36.0) - ESLint rules for JavaScript
- **typescript-eslint** (^8.45.0) - TypeScript support for ESLint
- **eslint-plugin-react-hooks** (^5.2.0) - Rules enforcement for React Hooks best practices
- **eslint-plugin-react-refresh** (^0.4.22) - Rules prevention of incompatible React Refresh usage

### Development Server

- **json-server** (^1.0.0-beta.3) - Full fake REST API for development and testing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd worldwise
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. In a separate terminal, start the mock API server

```bash
npm run server
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
`npm run build`
```

### Run Linting

```bash
npm run lint
```

