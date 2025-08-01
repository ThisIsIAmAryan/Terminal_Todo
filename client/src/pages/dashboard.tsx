import { useEffect } from "react";
import TerminalHeader from "@/components/terminal-header";
import TaskList from "@/components/task-list";
import TaskCalendar from "@/components/task-calendar";
import QuickActions from "@/components/quick-actions";
import CommandTerminal from "@/components/command-terminal";

export default function Dashboard() {
  useEffect(() => {
    // Set document title for terminal aesthetic
    document.title = "TASK_DASHBOARD_v2.1.0 - Terminal Interface";
    
    // Focus management for keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+/ to focus command input
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        const commandInput = document.getElementById('command-input') as HTMLInputElement;
        if (commandInput) {
          commandInput.focus();
        }
      }
      
      // Escape to blur any focused element
      if (e.key === 'Escape') {
        (document.activeElement as HTMLElement)?.blur();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="h-screen bg-terminal-bg text-matrix-green font-mono overflow-hidden matrix-bg">
      {/* Scanlines Effect */}
      <div className="scanlines fixed inset-0 pointer-events-none z-50"></div>
      
      {/* Main Dashboard Container */}
      <div className="h-screen flex flex-col p-4 gap-4">
        {/* Header Terminal */}
        <TerminalHeader />

        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-12 gap-4 h-full">
          {/* Left Panel - Task List */}
          <div className="col-span-5">
            <TaskList />
          </div>

          {/* Center Panel - Calendar */}
          <div className="col-span-4">
            <TaskCalendar />
          </div>

          {/* Right Panel - Quick Actions & Info */}
          <div className="col-span-3">
            <QuickActions />
          </div>
        </div>

        {/* Command Terminal */}
        <CommandTerminal />
      </div>
    </div>
  );
}
