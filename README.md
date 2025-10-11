# Facts Ark

A modern Vue 3 application with a clean, Tailwind UI-inspired interface.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## 💻 Development

The application uses **json-server** for local API development, providing a full REST API with data persistence.

### Running the Application

**Option 1: Run everything together (recommended)**

```bash
pnpm dev:all
```

**Option 2: Run separately**

```bash
# Terminal 1 - Vite dev server (port 5173)
pnpm dev

# Terminal 2 - json-server API (port 3001)
pnpm dev:api
```

### API Server

- **Port**: 3001
- **Endpoints**: `/todos`
- **Data**: Stored in `db.json` (persists between sessions)
- **Features**: Full CRUD, filtering, pagination, sorting

To reset your local data, copy the seed data:

```bash
cp db.example.json db.json
```

### Environment Variables

Update `.env` if needed:

```env
VITE_API_BASE_URL=http://localhost:3001
VITE_API_TIMEOUT=10000
```

## 🛠️ Tech Stack

- **Vue 3** + TypeScript
- **Tailwind CSS v4** - Utility-first styling
- **Ark UI** - Headless, accessible primitives
- **Lucide Icons** - Beautiful icon library
- **Vite** - Lightning-fast build tool
- **Vue Router** - Routing
- **Pinia** - State management

## 📚 Documentation

See the [docs folder](./docs) for detailed guides:

### Core Guides

- **[Component Architecture](./docs/COMPONENT_ARCHITECTURE.md)** - Application structure and layout
- **[Closed Components](./docs/CLOSED_COMPONENTS.md)** - Building reusable UI components
- **[Component Folder Structure](./docs/COMPONENT_FOLDER_STRUCTURE.md)** - Organizing component files
- **[Getting Started with Closed Components](./docs/GETTING_STARTED_CLOSED_COMPONENTS.md)** - Quick start guide

### Styling & Utilities

- **[Tailwind Variants](./docs/TAILWIND_VARIANTS.md)** - Type-safe variant management
- **[CN Utility Guide](./docs/CN_UTILITY_GUIDE.md)** - Class name merging utility
- **[Theming](./docs/THEMING.md)** - Colors and design tokens
- **[Custom Design System](./docs/CUSTOM_DESIGN_SYSTEM.md)** - Design philosophy

### Reference

- **[Changelog](./docs/CHANGELOG.md)** - Version history and updates
- **[Documentation Index](./docs/README.md)** - Complete documentation overview

## 🎨 Features

- ✅ Responsive sidebar with mobile drawer
- ✅ Collapsible navigation groups
- ✅ Clean Tailwind UI-inspired design
- ✅ Type-safe with TypeScript
- ✅ Accessible with Ark UI primitives
- ✅ Closed reusable UI components (Avatar, Badge, Button, Card)
- ✅ Component showcase at `/components` route

## 📦 Project Structure

```
src/
├── App.vue                 # Main application shell
├── components/
│   ├── ui/                # Closed reusable components (folder structure)
│   │   ├── avatar/        # Avatar component + types
│   │   ├── badge/         # Badge component + types
│   │   ├── button/        # Button component + types
│   │   ├── card/          # Card component + types
│   │   └── index.ts       # Barrel export
│   ├── AppLayout.vue      # Main layout wrapper
│   ├── AppSidebar.vue     # Sidebar navigation
│   └── AppHeader.vue      # Header with mobile menu
├── views/                 # Route views (pages)
├── router/                # Vue Router configuration
├── stores/                # Pinia state management
└── assets/                # Styles & static files
```

## 🧹 Scripts

```bash
pnpm dev          # Start Vite dev server
pnpm dev:api      # Start json-server API
pnpm dev:all      # Start both dev server and API
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Lint code (oxlint + eslint)
pnpm format       # Format code with Prettier
pnpm type-check   # Run TypeScript type checking
pnpm test:unit    # Run unit tests
pnpm test:e2e     # Run E2E tests
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for:

- Development workflow
- Component development guidelines
- Code style standards
- Documentation requirements
- Pull request process

## 📄 License

MIT
