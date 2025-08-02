# FocusTerminal - Task Management Dashboard

## Project Overview

FocusTerminal is a full-stack task management application with a unique terminal-inspired user interface. The application combines modern web technologies with a retro green-on-black terminal aesthetic, providing users with both graphical interface and command-line style interactions for task management.

## 🎯 Key Features

- **Terminal-Inspired UI**: Matrix-style green-on-black theme with scanlines effect
- **Command Terminal Interface**: Execute task operations using terminal commands
- **Task Management**: Full CRUD operations with priority levels and categories
- **Calendar Integration**: Monthly calendar view showing task distribution
- **Real-time Statistics**: Live task completion rates and analytics
- **Responsive Design**: Mobile-first design maintaining terminal aesthetics
- **Keyboard Shortcuts**: `Ctrl+/` to focus command input, `Escape` to blur

## 🏗️ Architecture

### Frontend Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **UI Components**: Radix UI primitives with shadcn/ui components
- **Styling**: Tailwind CSS with custom terminal-themed color scheme
- **Form Handling**: React Hook Form with Zod validation

### Backend Stack
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (production) / In-memory (development)
- **API Design**: RESTful API endpoints
- **Validation**: Zod schemas for runtime type validation

### Project Structure
```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ui/         # Reusable UI components (shadcn/ui)
│   │   │   ├── command-terminal.tsx    # Command interface
│   │   │   ├── task-list.tsx          # Task display and management
│   │   │   ├── task-calendar.tsx      # Calendar view
│   │   │   ├── quick-actions.tsx      # Quick action buttons
│   │   │   └── terminal-header.tsx    # Header with system info
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   ├── pages/          # Page components
│   │   └── types/          # TypeScript type definitions
├── server/                 # Backend Express application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Database abstraction layer
│   └── vite.ts            # Vite development server setup
├── shared/                # Shared code between client and server
│   └── schema.ts          # Database schema and validation
└── Configuration files
```

## 🗄️ Database Schema

### Tasks Table
```sql
CREATE TABLE tasks (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  priority VARCHAR CHECK (priority IN ('high', 'medium', 'low')) DEFAULT 'medium',
  category VARCHAR CHECK (category IN ('work', 'personal', 'health', 'learning')) DEFAULT 'personal',
  due_date DATE,
  completed BOOLEAN DEFAULT false,
  created_at DATE DEFAULT CURRENT_DATE
);
```

### Users Table
```sql
CREATE TABLE users (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);
```

## 🔌 API Endpoints

### Task Management
- `GET /api/tasks` - Retrieve all tasks
- `GET /api/tasks/filter?category=work&priority=high&date=2024-08-01` - Filter tasks
- `GET /api/tasks/today` - Get today's tasks
- `GET /api/tasks/stats` - Retrieve task statistics and analytics
- `POST /api/tasks` - Create new task
- `PATCH /api/tasks/:id` - Update task
- `PATCH /api/tasks/:id/complete` - Mark task as complete
- `DELETE /api/tasks/:id` - Delete task

### Request/Response Examples

#### Create Task
```json
POST /api/tasks
{
  "title": "Fix critical bug",
  "description": "Address the login issue in production",
  "priority": "high",
  "category": "work",
  "dueDate": "2024-08-15"
}
```

#### Task Statistics Response
```json
GET /api/tasks/stats
{
  "pending": 15,
  "inProgress": 3,
  "completed": 12,
  "total": 30,
  "byCategory": {
    "work": 10,
    "personal": 8,
    "health": 5,
    "learning": 7
  },
  "byPriority": {
    "high": 4,
    "medium": 18,
    "low": 8
  }
}
```

## 💻 Command Terminal Interface

The application features a command-line interface for power users. Available commands:

### Task Operations
```bash
# Create tasks
add-task "Task title" --priority=high --category=work --due=2024-08-15 --description="Task description"

# List tasks with filters
list-tasks                    # All tasks
list-tasks --filter=today     # Today's tasks
list-tasks --filter=completed # Completed tasks
list-tasks --filter=pending   # Pending tasks

# Task management
complete-task [task-id]       # Mark task as complete
delete-task [task-id]         # Delete task

# Information
show-stats                    # Display task statistics
help                         # Show available commands
clear                        # Clear command history
```

### Command Examples
```bash
add-task "Review pull requests" --priority=medium --category=work --due=2024-08-01
list-tasks --filter=today
complete-task abc123-def456-ghi789
show-stats
```

## 🎨 UI Components

### Core Components

#### Dashboard Layout
- **TerminalHeader**: System status, clock, and application branding
- **TaskList**: Main task display with filtering and actions
- **TaskCalendar**: Monthly calendar with task indicators
- **QuickActions**: Shortcut buttons and system information
- **CommandTerminal**: Command-line interface for task operations

#### Task Management
- **Priority Levels**: High (red), Medium (yellow), Low (green)
- **Categories**: Work (cyan), Personal (accent), Health (green), Learning (yellow)
- **Task Cards**: Interactive cards with hover effects and priority indicators

#### Interactive Features
- **Hover Effects**: Glowing animations on interactive elements
- **Keyboard Navigation**: Full keyboard accessibility
- **Real-time Updates**: Live statistics and task synchronization

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL (for production)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd FocusTerminal

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Configure database (if using PostgreSQL)
npm run db:push

# Start development server
npm run dev
```

### Environment Variables
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:password@localhost:5432/focusterminal
```

### Available Scripts
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run check      # Type checking
npm run db:push    # Push database schema
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Configuration
- Set `NODE_ENV=production`
- Configure `DATABASE_URL` for PostgreSQL connection
- Set `PORT` (defaults to 5000)

## 🎯 Usage Guide

### Getting Started
1. **Navigation**: Use the dashboard to view tasks across different sections
2. **Adding Tasks**: Click "ADD_TASK" in Quick Actions or use the command terminal
3. **Command Interface**: Press `Ctrl+/` to focus the command input
4. **Calendar View**: Click on calendar dates to view tasks for specific days
5. **Task Management**: Use buttons on task cards or terminal commands

### Command Terminal Tips
- Type `help` to see all available commands
- Use up/down arrows to navigate command history
- Commands support options like `--priority`, `--category`, `--due`
- Tab completion is available for common commands

### Keyboard Shortcuts
- `Ctrl+/`: Focus command input
- `Escape`: Blur focused element
- `Up/Down`: Navigate command history
- `Enter`: Execute command

## 🔮 Theme and Styling

### Color Scheme
```css
:root {
  --terminal-bg: #0a0a0a;          /* Deep black backgrounds */
  --terminal-surface: #111111;      /* Card backgrounds */
  --terminal-border: #1a1a1a;       /* Border colors */
  --matrix-green: #00ff00;          /* Primary green */
  --cyber-cyan: #00ffff;            /* Accent cyan */
  --warning-yellow: #ffaa00;        /* Warning states */
  --error-red: #ff0044;             /* Error states */
  --muted-gray: #666666;            /* Secondary text */
}
```

### Visual Effects
- **Matrix Background**: Animated radial gradients
- **Scanlines**: CSS-only retro CRT effect
- **Glow Effects**: Text and border animations
- **Hover States**: Transform and shadow transitions

## 🔍 Monitoring and Analytics

### System Information Display
- **Uptime Tracking**: Session-based uptime counter
- **Task Statistics**: Real-time completion rates
- **Memory Usage**: Simulated system memory display
- **Category Distribution**: Visual breakdown of tasks by category

### Performance Considerations
- **React Query Caching**: Efficient data fetching and caching
- **Optimistic Updates**: Immediate UI feedback
- **Lazy Loading**: Components loaded as needed
- **Debounced Inputs**: Reduced API calls

## 🐛 Troubleshooting

### Common Issues
1. **Database Connection**: Ensure PostgreSQL is running and accessible
2. **Port Conflicts**: Check if port 5000 is available
3. **Build Errors**: Clear node_modules and reinstall dependencies
4. **Command Not Working**: Check command syntax in help panel

### Development Tips
- Use browser dev tools to inspect network requests
- Check terminal output for server-side errors
- Enable React Dev Tools for component debugging
- Monitor database queries in development mode

## 📚 Dependencies

### Core Dependencies
- **React 18**: Modern React with concurrent features
- **TypeScript**: Type safety and better development experience
- **Express.js**: Lightweight web framework
- **Drizzle ORM**: Type-safe database operations
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives

### Key Features by Library
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Performant form handling
- **Zod**: Runtime type validation
- **Wouter**: Minimalist routing
- **Lucide React**: Modern icon library

This is a comprehensive task management solution that combines modern development practices with a unique terminal-inspired user experience, making productivity both functional and visually engaging.
