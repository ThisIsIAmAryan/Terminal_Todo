# Task Dashboard Application

## Overview

This is a full-stack task management application built with a terminal-inspired UI aesthetic. The application features a React frontend with a retro green-on-black terminal theme, powered by an Express.js backend with PostgreSQL database integration. Users can manage tasks through both a graphical interface and command-line style interactions, complete with priority levels, categories, due dates, and calendar views.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development tooling
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible components
- **Styling**: Tailwind CSS with custom terminal-themed color scheme (matrix green, cyber cyan, terminal backgrounds)
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

### Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **Database ORM**: Drizzle ORM for type-safe database operations and migrations
- **API Design**: RESTful API endpoints following conventional patterns
- **Storage Layer**: Abstracted storage interface supporting both in-memory (development) and PostgreSQL (production) implementations
- **Middleware**: Custom request logging, JSON parsing, and error handling middleware

### Database Schema
- **Tasks Table**: Stores task data with fields for title, description, priority (high/medium/low), category (work/personal/health/learning), due dates, completion status, and creation timestamps
- **Users Table**: Basic user management with username and password fields
- **Database Features**: UUID primary keys, enums for constrained values, and date handling

### Key Features
- **Command Terminal Interface**: Custom command parser supporting task creation, filtering, and management through terminal-style commands
- **Task Management**: Full CRUD operations with priority levels, categories, and due date tracking
- **Calendar Integration**: Monthly calendar view showing task distribution and deadlines
- **Real-time Statistics**: Live task completion rates, priority breakdowns, and category analytics
- **Responsive Design**: Mobile-first responsive layout with terminal aesthetics maintained across devices

### API Endpoints
- `GET /api/tasks` - Retrieve all tasks
- `GET /api/tasks/filter` - Filter tasks by category, priority, or date
- `GET /api/tasks/today` - Get today's tasks
- `GET /api/tasks/stats` - Retrieve task statistics and analytics
- `POST /api/tasks` - Create new tasks
- `PATCH /api/tasks/:id/complete` - Mark tasks as complete
- `DELETE /api/tasks/:id` - Remove tasks

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL database service for production data storage
- **Connection**: Uses `@neondatabase/serverless` driver for optimal serverless performance

### UI Libraries
- **Radix UI**: Comprehensive set of low-level UI primitives for accessibility and customization
- **Embla Carousel**: Lightweight carousel component for interactive elements
- **Lucide Icons**: Modern icon library for consistent iconography throughout the application

### Development Tools
- **Drizzle Kit**: Database migration and schema management tools
- **TSX**: TypeScript execution for development server
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer plugins

### Form and Validation
- **Zod**: Runtime type validation and schema definition
- **React Hook Form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Integration between React Hook Form and Zod validation

### Utility Libraries
- **date-fns**: Modern date utility library for date formatting and manipulation
- **clsx**: Utility for constructing className strings conditionally
- **class-variance-authority**: Type-safe variant API for component styling