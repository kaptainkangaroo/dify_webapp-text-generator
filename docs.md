# WebApp Text Generator Onboarding Guide

## Project Overview
Next.js 14 application with TypeScript focusing on text generation workflows. Key features:
- AI-powered text completion endpoints
- File upload processing
- Internationalization (i18n) support
- Monaco Editor integration
- Batch processing capabilities

## Technology Stack
### Core Dependencies
- **Framework**: Next.js 14.1.1
- **Language**: TypeScript 4.9.5
- **Styling**: Tailwind CSS 3.2.7 + SCSS
- **State Management**: SWR 2.1.0 + Immer 9.0.19
- **Internationalization**: i18next 22.4.13
- **UI**: HeadlessUI 1.7.13 + Heroicons 2.0.16

### Key Libraries
- Text Processing: React-Markdown 8.0.6 + KaTeX
- Data Handling: Axios 1.3.5 + PapaParse 4.1.0
- Code Editing: Monaco Editor 4.6.0
- Utilities: classnames, uuid, copy-to-clipboard

## Project Structure
```
├── app/               # Next.js app router
│   ├── api/           # API endpoints
│   │   ├── completion-messages/
│   │   ├── file-upload/ 
│   │   └── workflows/
│   └── components/    # Reusable components
│       ├── base/      # UI primitives
│       └── result/    # Display components
├── i18n/              # Localization config
│   └── lang/          # Translation files
├── public/            # Static assets
│   └── vs/            # Monaco Editor resources
├── service/           # API client layer
└── types/             # Type definitions
```

## Development Setup
```bash
# Install dependencies
yarn install

# Start dev server
yarn dev

# Production build
yarn build && yarn start

# Linting
yarn lint  # Check for issues
yarn fix   # Auto-fix lint errors
```

## Key Architectural Patterns
1. **API Design**:
   - REST endpoints under `/app/api`
   - Dify client integration for AI completions
   - File upload processing with streaming support

2. **Internationalization**:
   - Bilingual support (en/zh)
   - Server/client split translations
   - React-i18next hooks

3. **Code Quality**:
   - ESLint with strict TypeScript rules
   - Pre-commit hooks (Husky)
   - Error boundary wrappers

## Deployment
```dockerfile
FROM --platform=linux/amd64 node:19-bullseye-slim
WORKDIR /app
COPY . .
RUN yarn install && yarn build
EXPOSE 3000
CMD ["yarn","start"]
```

## UI Architecture

### Component Hierarchy
1. **Base Components** (`/components/base`):
   - Headless UI primitives (Button, Select, Tooltip)
   - Icon system with Heroicons
   - Form elements (ImageUploader, MarkdownEditor)
   - Loading states and error boundaries

2. **Feature Components**:
   - Text Generation Interface (`/components/run-once`)
   - Batch Processing UI (`/components/run-batch`)
   - Result Visualization (`/components/result`)
   - Configuration Management (`/components/config-scence`)

### Design Patterns
- **Compound Components**: Used in complex UI elements (e.g., TabHeader)
- **Component Composition**: Base components combined in feature components
- **State Management**:
  - Local state with `useState`/`useReducer`
  - Global UI state via Context API
  - Form state management with uncontrolled components

### Styling System
- Tailwind CSS utility classes
- CSS Modules for component-scoped styles
- Responsive design hooks (`useBreakpoints`)
- Animation transitions with Headless UI

### Form Handling

#### Variable Input Forms
- Location: 
  - `components/config-scence` (variable configuration setup)
  - `components/run-once` (runtime input collection)
- Dynamic form generation from `prompt_variables` configuration
- Input types supported:
  - Text inputs (string variables)
  - Number inputs (number variables)
  - File uploads (image variables via `image-uploader` components)

#### Implementation Details
- **State Management**: 
  - Form state tracked via React `useState`
  - Input values stored in key-value pairs mapped to variable names
- **Validation**:
  - Required field checking
  - Type validation (numeric ranges, string formats)
  - Real-time validation feedback
- **Styling**:
  - Tailwind classes for input styling
  - CSS Modules for layout structure
  - Error states using border colors and text styles

### UI Libraries Integration
- Monaco Editor for code editing
- React-Tooltip for interactive hints 
- Floating UI for positioning
- React-Syntax-Highlighter for code display

## Development Practices
1. Component Structure:
   - Presentational components in `/components/base`
   - Feature components in `/components/[feature]`
   - CSS Modules for component styling

2. State Management:
   - SWR for data fetching/caching
   - Context API for global state
   - Immer for immutable updates

3. Testing:
   - TypeScript compiler as primary validation
   - Interactive testing via dev server
