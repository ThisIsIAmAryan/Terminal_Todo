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
    <div className="flex flex-col gap-4 h-full">
      {/* Quick Actions */}
      <div className="terminal-border bg-terminal-surface p-4 rounded">
        <h2 className="text-cyber-cyan mb-3 text-sm font-bold">╔═══ QUICK ACTIONS ═══╗</h2>
        <div className="space-y-2 text-xs">
          <button 
            onClick={focusCommandInput}
            className="w-full text-left text-matrix-green hover:text-cyber-cyan p-2 hover:bg-terminal-border rounded transition-colors"
          >
            &gt; ADD_TASK --priority=high
          </button>
          <button 
            onClick={showTodayTasks}
            className="w-full text-left text-matrix-green hover:text-cyber-cyan p-2 hover:bg-terminal-border rounded transition-colors"
          >
            &gt; LIST_TASKS --filter=today
          </button>
          <button 
            onClick={showStats}
            className="w-full text-left text-matrix-green hover:text-cyber-cyan p-2 hover:bg-terminal-border rounded transition-colors"
          >
            &gt; SHOW_STATS --period=week
          </button>
          <button className="w-full text-left text-matrix-green hover:text-cyber-cyan p-2 hover:bg-terminal-border rounded transition-colors">
            &gt; EXPORT_DATA --format=json
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="terminal-border bg-terminal-surface p-4 rounded">
        <h2 className="text-cyber-cyan mb-3 text-sm font-bold">╔═══ CATEGORIES ═══╗</h2>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center p-2 hover:bg-terminal-border rounded cursor-pointer transition-colors">
            <span className="category-work">[WORK]</span>
            <span className="text-muted-gray">{stats?.byCategory?.work || 0}</span>
          </div>
          <div className="flex justify-between items-center p-2 hover:bg-terminal-border rounded cursor-pointer transition-colors">
            <span className="category-personal">[PERSONAL]</span>
            <span className="text-muted-gray">{stats?.byCategory?.personal || 0}</span>
          </div>
          <div className="flex justify-between items-center p-2 hover:bg-terminal-border rounded cursor-pointer transition-colors">
            <span className="category-health">[HEALTH]</span>
            <span className="text-muted-gray">{stats?.byCategory?.health || 0}</span>
          </div>
          <div className="flex justify-between items-center p-2 hover:bg-terminal-border rounded cursor-pointer transition-colors">
            <span className="category-learning">[LEARNING]</span>
            <span className="text-muted-gray">{stats?.byCategory?.learning || 0}</span>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="terminal-border bg-terminal-surface p-4 rounded flex-1">
        <h2 className="text-cyber-cyan mb-3 text-sm font-bold">╔═══ SYSTEM INFO ═══╗</h2>
        <div className="space-y-2 text-xs text-muted-gray">
          <div>UPTIME: <span className="text-matrix-green">{uptime}</span></div>
          <div>TASKS PROCESSED: <span className="text-matrix-green">{stats?.total || 0}</span></div>
          <div>COMPLETION RATE: <span className="text-matrix-green">{completionRate}%</span></div>
          <div>LAST SYNC: <span className="text-matrix-green">LIVE</span></div>
          <div className="mt-4">
            <div className="text-cyber-cyan mb-1">MEMORY USAGE:</div>
            <div className="bg-terminal-bg rounded p-1">
              <div 
                className="bg-matrix-green h-1 rounded transition-all duration-500" 
                style={{ width: `${memoryUsage}%` }}
              ></div>
            </div>
            <div className="text-right mt-1">{memoryUsage.toFixed(0)}% / 512MB</div>
          </div>
        </div>
      </div>
    </div>
  );
}
