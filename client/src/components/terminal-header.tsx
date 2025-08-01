import { useState, useEffect } from "react";

export default function TerminalHeader() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      const dateString = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
      setCurrentTime(`${dateString} ${timeString}`);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-border bg-terminal-surface p-4 rounded">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-error-red">●</span>
          <span className="text-warning-yellow">●</span>
          <span className="text-matrix-green">●</span>
          <span className="ml-4 text-cyber-cyan">TASK_DASHBOARD_v2.1.0</span>
        </div>
        <div className="text-muted-gray text-sm">
          {currentTime}
        </div>
      </div>
      <div className="text-xs">
        <span className="text-muted-gray">[USER@PRODUCTIVITY-SYSTEM]</span>
        <span className="text-matrix-green animate-glow ml-2">$ SYSTEM STATUS: ONLINE</span>
      </div>
    </div>
  );
}
