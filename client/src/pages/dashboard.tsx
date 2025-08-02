import { useEffect } from "react";
import TerminalHeader from "@/components/terminal-header";
import TaskList from "@/components/task-list";
import TaskCalendar from "@/components/task-calendar";
import QuickActions from "@/components/quick-actions";
import CommandTerminal from "@/components/command-terminal";
import { useMatrixBackground } from "@/hooks/use-matrix-background";

export default function Dashboard() {
  useMatrixBackground();
  
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
    <div className="h-screen bg-terminal-bg text-matrix-green font-mono overflow-hidden relative">
      {/* Matrix Background Canvas */}
      <canvas 
        id="matrix" 
        className="fixed inset-0 w-full h-full pointer-events-none z-0" 
        style={{ opacity: 0.35 }} // Adjusted opacity for better visibility
      ></canvas>
      
      {/* Scanlines Effect */}
      <div className="scanlines fixed inset-0 pointer-events-none z-10"></div>
      
      {/* Main Dashboard Container */}
      <div className="relative z-20 h-full flex flex-col p-3 gap-3">
        {/* Header Terminal */}
        <div className="flex-shrink-0">
          <TerminalHeader />
        </div>

        {/* Main Content Grid - Takes up more space */}
        <div className="flex-1 grid grid-cols-12 gap-3 min-h-0 overflow-hidden" style={{ maxHeight: 'calc(100vh - 320px)' }}>
          {/* Left Panel - Task List */}
          <div className="col-span-5 min-h-0 overflow-hidden">
            <div className="h-full overflow-y-auto scrollbar-thin">
              <TaskList />
            </div>
          </div>

          {/* Center Panel - Calendar */}
          <div className="col-span-4 min-h-0 overflow-hidden">
            <div className="h-full overflow-y-auto scrollbar-thin">
              <TaskCalendar />
            </div>
          </div>

          {/* Right Panel - Quick Actions & Info */}
          <div className="col-span-3 min-h-0 overflow-hidden">
            <div className="h-full overflow-y-auto scrollbar-thin">
              <QuickActions />
            </div>
          </div>
        </div>

        {/* Command Terminal - Increased height */}
        <div className="flex-shrink-0 h-64 overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-thin">
            <CommandTerminal />
          </div>
        </div>
      </div>
    </div>
  );
}
