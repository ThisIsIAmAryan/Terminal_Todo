import { useTasks } from "@/hooks/use-tasks";
import { useState, useEffect } from "react";

export default function QuickActions() {
  const { stats } = useTasks();
  const [uptime, setUptime] = useState("00:00:00");
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const updateUptime = () => {
      const elapsed = Date.now() - startTime;
      const hours = Math.floor(elapsed / (1000 * 60 * 60));
      const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
      
      setUptime(
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      );
    };

    updateUptime();
    const interval = setInterval(updateUptime, 1000);
    
    return () => clearInterval(interval);
  }, [startTime]);

  const completionRate = stats && stats.total > 0 
    ? ((stats.completed / stats.total) * 100).toFixed(1)
    : "0.0";

  const memoryUsage = stats?.total ? Math.min((stats.total / 50) * 100, 100) : 0;

  const focusCommandInput = () => {
    const commandInput = document.getElementById('command-input') as HTMLInputElement;
    if (commandInput) {
      commandInput.focus();
      commandInput.value = 'add-task "';
    }
  };

  const showTodayTasks = () => {
    const commandInput = document.getElementById('command-input') as HTMLInputElement;
    if (commandInput) {
      commandInput.focus();
      commandInput.value = 'list-tasks --filter=today';
    }
  };

  const showStats = () => {
    const commandInput = document.getElementById('command-input') as HTMLInputElement;
    if (commandInput) {
      commandInput.focus();
      commandInput.value = 'show-stats --period=week';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Quick Actions */}
      <div className="terminal-border bg-terminal-surface p-3 rounded mb-3">
        <h2 className="text-cyber-cyan mb-2 text-xs font-bold">╔═══ QUICK ACTIONS ═══╗</h2>
        <div className="space-y-1 text-xs">
          <button 
            onClick={focusCommandInput}
            className="w-full text-left text-matrix-green hover:text-cyber-cyan p-1 hover:bg-terminal-border rounded transition-colors"
          >
            &gt; ADD_TASK --priority=high
          </button>
          <button 
            onClick={showTodayTasks}
            className="w-full text-left text-matrix-green hover:text-cyber-cyan p-1 hover:bg-terminal-border rounded transition-colors"
          >
            &gt; LIST_TASKS --filter=today
          </button>
          <button 
            onClick={showStats}
            className="w-full text-left text-matrix-green hover:text-cyber-cyan p-1 hover:bg-terminal-border rounded transition-colors"
          >
            &gt; SHOW_STATS --period=week
          </button>
        </div>
      </div>



      {/* System Info - Now takes remaining space */}
      <div className="terminal-border bg-terminal-surface p-3 rounded flex-1 min-h-0 flex flex-col">
        <h2 className="text-cyber-cyan mb-2 text-xs font-bold flex-shrink-0">╔═══ SYSTEM INFO ═══╗</h2>
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
          <div className="space-y-1 text-xs text-muted-gray">
            <div>UPTIME: <span className="text-matrix-green">{uptime}</span></div>
            <div>TASKS PROCESSED: <span className="text-matrix-green">{stats?.total || 0}</span></div>
            <div>COMPLETION RATE: <span className="text-matrix-green">{completionRate}%</span></div>
            <div>LAST SYNC: <span className="text-matrix-green">LIVE</span></div>
            <div>CONNECTION: <span className="text-matrix-green">SECURE</span></div>
            <div>STATUS: <span className="text-matrix-green">OPERATIONAL</span></div>
            <div>VERSION: <span className="text-matrix-green">v2.1.0</span></div>
            <div>BUILD: <span className="text-matrix-green">20250801</span></div>
            <div>THREADS: <span className="text-matrix-green">8</span></div>
            <div>LOAD AVG: <span className="text-matrix-green">0.45</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
