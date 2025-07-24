# GasoLink - Find the Best Gas Prices Near You

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

GasoLink is a modern web application that helps users find the best gas prices at nearby gas stations in Spain. Built with a focus on user experience, it provides real-time price comparisons and station details to help you save money on fuel.

## 🚀 Technologies

- **Frontend**:

  - React 18 with TypeScript
  - Vite (Build Tool)
  - Tailwind CSS (Styling)
  - HeroUI (UI Components)
  - React Query (Data Fetching)
  - React Router (Navigation)
  - Zustand (State Management)

- **Backend**:
  - Tauri (Desktop App Wrapper)
  - Rust (Backend Core)

## 📁 Project Structure

```
gasolink-app/
├── public/              # Static files
├── src/
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Page layout components
│   ├── pages/           # Application pages
│   ├── stores/          # State management
│   ├── styles/          # Global styles and themes
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── src-tauri/           # Tauri configuration
├── .env.example         # Environment variables example
├── package.json         # Project dependencies
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## 🛠️ Prerequisites

- Node.js (v16 or higher)
- pnpm (v7 or higher)
- Rust (for Tauri development)
- System dependencies for Tauri: [Tauri Prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites)

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/gasolink-app.git
cd gasolink-app
```

### Install Dependencies

```bash
pnpm install
```

### Environment Setup

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your configuration:
   ```env
   VITE_API_BASE_URL=https://api.gasolink.example.com
   ```

### Development

```bash
# Start the development server
pnpm dev

# Build for production
pnpm build

# Preview the production build
pnpm preview

# Tauri development
pnpm tauri dev

# Tauri build
pnpm tauri build
```

## 🌐 Deployment

### Web Deployment

1. Build the application:

   ```bash
   pnpm build
   ```

2. Deploy the contents of the `dist` directory to your preferred static hosting service (Vercel, Netlify, GitHub Pages, etc.)

### Desktop Application

1. Build the Tauri application:

   ```bash
   pnpm tauri build
   ```

2. Find the installer in `src-tauri/target/release/`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tauri](https://tauri.app/) for the awesome desktop app framework
- [HeroUI](https://heroui.net/) for the beautiful UI components
- All the open-source libraries that made this project possible
