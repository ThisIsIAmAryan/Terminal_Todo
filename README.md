# 🖥️ FocusTerminal

A cyberpunk-themed terminal-style task management dashboard built with React, TypeScript, and modern web technologies. Experience task management like never before with a Matrix-inspired interface complete with falling red characters and terminal aesthetics.

![FocusTerminal Interface](./preview.png)

## ✨ Features

### 🎨 Visual Design
- **Cyberpunk Terminal Interface** - Authentic terminal styling with monospace fonts
- **Matrix Background Animation** - Dynamic falling red matrix characters
- **Custom Color Scheme** - White, red, and pastel accent colors
- **Responsive Grid Layout** - Optimized for desktop use
- **Custom Scrollbars** - Terminal-themed scrolling elements

### 📋 Task Management
- **Create Tasks** - Add tasks with title, description, priority, and category
- **Task Categories** - Work, Personal, Health, Learning with distinct colors
- **Priority Levels** - High (red), Medium (yellow), Low (green) indicators
- **Due Date Tracking** - Calendar integration with task visualization
- **Task Completion** - Mark tasks as complete/incomplete
- **Task Statistics** - Real-time stats and analytics

### 💻 Terminal Commands
- **Command-Line Interface** - Full CLI for task management
- **Command History** - Arrow key navigation through previous commands
- **Auto-Complete** - Smart command suggestions
- **Help System** - Built-in help documentation

### 📅 Calendar Integration
- **Monthly View** - Navigate through months with task indicators
- **Task Dots** - Color-coded priority indicators on calendar days
- **Category Statistics** - Live task counts by category
- **Today Highlighting** - Current date emphasis

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FocusTerminal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npm run db:push
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎮 Usage

### Command Terminal
The heart of FocusTerminal is its command-line interface. Type commands to manage your tasks:

#### Available Commands

**Task Management:**
```bash
# Create a new task
add-task "Fix authentication bug" --priority=high --category=work --due=2025-08-15

# Complete a task
complete-task 123

# Delete a task  
delete-task 123

# List tasks with filters
list-tasks --filter=today
list-tasks --filter=completed
list-tasks --filter=pending
```

**System Commands:**
```bash
# Show task statistics
show-stats

# Clear command history
clear

# Show help
help
```

### Task Categories
- 🔵 **Work** - Professional and work-related tasks
- 🟡 **Personal** - Personal life and errands  
- 🟣 **Health** - Health, fitness, and wellness
- 🟨 **Learning** - Education and skill development

### Priority Levels
- 🔴 **High** - Urgent, important tasks
- 🟡 **Medium** - Standard priority tasks
- 🟢 **Low** - Nice-to-have tasks

### Keyboard Shortcuts
- `Ctrl + /` - Focus command input
- `↑/↓ Arrow Keys` - Navigate command history
- `Escape` - Blur focused element

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server
- **Tanstack Query** - Server state management

### Backend
- **Express.js** - Web application framework
- **Drizzle ORM** - Type-safe database toolkit
- **Neon Database** - Serverless PostgreSQL

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Custom Components** - Terminal-themed UI elements

## 📁 Project Structure

```
FocusTerminal/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/        # Base UI components
│   │   │   ├── command-terminal.tsx
│   │   │   ├── task-calendar.tsx
│   │   │   ├── task-list.tsx
│   │   │   └── ...
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Page components
│   │   ├── types/        # TypeScript definitions
│   │   └── index.css     # Global styles
├── server/               # Backend Express server
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API routes
│   └── storage.ts       # Database operations
├── shared/              # Shared types and schemas
└── package.json
```

## 🎨 Customization

### Color Scheme
The project uses CSS custom properties for easy theming. Edit `client/src/index.css`:

```css
:root {
  --primary: hsl(0, 0%, 100%);        /* White text */
  --matrix-green: hsl(0, 70%, 60%);   /* Red matrix */
  --cyber-cyan: hsl(200, 50%, 80%);   /* Light blue */
  --health-purple: hsl(280, 60%, 75%); /* Purple health */
  /* ... more colors */
}
```

### Matrix Animation
Customize the falling matrix characters in `client/src/hooks/use-matrix-background.ts`:

```typescript
// Change animation speed (lower = faster)
const interval = setInterval(draw, 20);

// Modify fade effect
ctx.fillStyle = 'rgba(0, 0, 0, 0.01)';

// Update matrix characters
const matrixChars = 'Your custom characters here';
```

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/api/tasks/stats` | Get task statistics |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Matrix digital rain animation inspiration
- Cyberpunk aesthetics and terminal culture
- Open source community for amazing tools

## 📞 Support

If you encounter any issues or have questions:
- Create an issue on GitHub
- Check the command help with `help` command
- Review this documentation

---

**Made with ❤️ and lots of ☕**

*Experience the future of task management in the terminal.*
