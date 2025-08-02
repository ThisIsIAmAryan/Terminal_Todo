import { useState, useEffect } from "react";
import { useTasks } from "@/hooks/use-tasks";

export default function TerminalHeader() {
  const [currentTime, setCurrentTime] = useState("");
  const { stats } = useTasks();

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

  const memoryUsage = stats?.total ? Math.min((stats.total / 50) * 100, 100) : 0;

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
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <span className="text-muted-gray">[ThisIsIAmAryan@FOCUS-MODE]</span>
          <span className="text-matrix-green animate-glow">$ SYSTEM STATUS: ONLINE</span>
        </div>
        <div className="flex items-center gap-6 text-muted-gray">
          <div className="flex items-center gap-2">
            <span className="text-cyber-cyan">MEM:</span>
            <div className="w-12 bg-terminal-bg rounded h-1">
              <div className="bg-matrix-green h-1 rounded transition-all duration-500" style={{ width: `${memoryUsage}%` }}></div>
            </div>
            <span className="text-matrix-green">{memoryUsage.toFixed(0)}%</span>
          </div>
          <div><span className="text-cyber-cyan">NET:</span> <span className="text-matrix-green">12ms</span></div>
          <div><span className="text-cyber-cyan">DISK:</span> <span className="text-matrix-green">45%</span></div>
          <div><span className="text-cyber-cyan">SEC:</span> <span className="text-matrix-green">ACTIVE</span></div>
        </div>
      </div>
    </div>
  );
}
