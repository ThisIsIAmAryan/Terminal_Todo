import { useState, useEffect, useRef } from "react";
import { useTasks } from "@/hooks/use-tasks";
import { parseCommand, CommandResult } from "@/types/commands";

interface CommandHistory {
  command: string;
  result: CommandResult;
  timestamp: string;
}

export default function CommandTerminal() {
  const [currentCommand, setCurrentCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([]);
  const [showHelp, setShowHelp] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { createTask, tasks, deleteTask, completeTask } = useTasks();

  useEffect(() => {
    // Focus on command input when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const addToHistory = (command: string, result: CommandResult) => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setCommandHistory(prev => [...prev, { command, result, timestamp }]);
  };

  const executeCommand = async (command: string) => {
    if (!command.trim()) return;

    const parsedCommand = parseCommand(command);
    let result: CommandResult;

    try {
      switch (parsedCommand.action) {
        case 'help':
          setShowHelp(!showHelp);
          result = { success: true, message: showHelp ? 'HELP PANEL HIDDEN' : 'SHOWING AVAILABLE COMMANDS' };
          break;

        case 'clear':
          setCommandHistory([]);
          result = { success: true, message: 'COMMAND HISTORY CLEARED' };
          break;

        case 'add-task':
          if (!parsedCommand.title) {
            result = { success: false, message: 'ERROR: Task title is required' };
          } else {
            const taskData = {
              title: parsedCommand.title,
              description: parsedCommand.description || undefined,
              priority: parsedCommand.priority || 'medium',
              category: parsedCommand.category || 'personal',
              dueDate: parsedCommand.dueDate || undefined,
            };
            
            await createTask.mutateAsync(taskData);
            result = { success: true, message: `✓ TASK CREATED: "${parsedCommand.title}"` };
          }
          break;

        case 'complete-task':
          if (!parsedCommand.taskId) {
            result = { success: false, message: 'ERROR: Task ID is required' };
          } else {
            const task = tasks?.find(t => t.id === parsedCommand.taskId);
            if (!task) {
              result = { success: false, message: 'ERROR: Task not found' };
            } else {
              await completeTask.mutateAsync(parsedCommand.taskId);
              result = { success: true, message: `✓ TASK COMPLETED: "${task.title}"` };
            }
          }
          break;

        case 'delete-task':
          if (!parsedCommand.taskId) {
            result = { success: false, message: 'ERROR: Task ID is required' };
          } else {
            const task = tasks?.find(t => t.id === parsedCommand.taskId);
            if (!task) {
              result = { success: false, message: 'ERROR: Task not found' };
            } else {
              await deleteTask.mutateAsync(parsedCommand.taskId);
              result = { success: true, message: `✓ TASK DELETED: "${task.title}"` };
            }
          }
          break;

        case 'list-tasks':
          let taskList = tasks || [];
          
          if (parsedCommand.filter === 'today') {
            const today = new Date().toISOString().split('T')[0];
            taskList = taskList.filter(task => task.dueDate === today);
          } else if (parsedCommand.filter === 'completed') {
            taskList = taskList.filter(task => task.completed);
          } else if (parsedCommand.filter === 'pending') {
            taskList = taskList.filter(task => !task.completed);
          }
          
          result = { 
            success: true, 
            message: `✓ DISPLAYING ${taskList.length} TASKS`,
            data: taskList 
          };
          break;

        case 'show-stats':
          const stats = {
            total: tasks?.length || 0,
            completed: tasks?.filter(t => t.completed).length || 0,
            pending: tasks?.filter(t => !t.completed).length || 0,
            byPriority: {
              high: tasks?.filter(t => t.priority === 'high').length || 0,
              medium: tasks?.filter(t => t.priority === 'medium').length || 0,
              low: tasks?.filter(t => t.priority === 'low').length || 0,
            }
          };
          result = { 
            success: true, 
            message: '✓ TASK STATISTICS GENERATED',
            data: stats 
          };
          break;

        default:
          result = { success: false, message: `ERROR: Unknown command "${parsedCommand.action}". Type "help" for available commands.` };
      }
    } catch (error) {
      result = { success: false, message: `ERROR: ${error instanceof Error ? error.message : 'Unknown error occurred'}` };
    }

    addToHistory(command, result);
  };

  const handleKeyPress = async (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      await executeCommand(currentCommand);
      setCurrentCommand("");
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex].command);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        if (newIndex === commandHistory.length - 1) {
          setHistoryIndex(-1);
          setCurrentCommand("");
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex].command);
        }
      }
    }
  };

  return (
    <div className="terminal-border bg-terminal-surface p-4 rounded">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-muted-gray text-xs">[TASK_MANAGER@localhost]</span>
        <span className="text-cyber-cyan text-xs">~$</span>
        <input 
          ref={inputRef}
          id="command-input"
          type="text" 
          value={currentCommand}
          onChange={(e) => setCurrentCommand(e.target.value)}
          onKeyDown={handleKeyPress}
          className="bg-transparent border-none outline-none text-matrix-green font-mono flex-1 text-sm"
          placeholder="Enter command (type 'help' for available commands)"
        />
        <span className="text-matrix-green animate-cursor text-sm">_</span>
      </div>
      
      {/* Command History */}
      <div className="text-xs space-y-1 max-h-20 overflow-y-auto scrollbar-thin">
        {commandHistory.slice(-4).map((entry, index) => (
          <div key={index}>
            <div className="text-muted-gray">
              <span className="text-cyber-cyan">[{entry.timestamp}]</span> &gt; {entry.command}
            </div>
            <div className={entry.result.success ? "text-matrix-green" : "text-error-red"}>
              {entry.result.message}
            </div>
          </div>
        ))}
      </div>

      {/* Help Panel */}
      {showHelp && (
        <div className="mt-4 text-xs text-muted-gray border-t border-terminal-border pt-4">
          <div className="text-cyber-cyan mb-2">AVAILABLE COMMANDS:</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-matrix-green">add-task "title" [options]</div>
              <div className="ml-2">--priority=(high|medium|low)</div>
              <div className="ml-2">--category=(work|personal|health|learning)</div>
              <div className="ml-2">--due=YYYY-MM-DD</div>
              <div className="ml-2">--description="text"</div>
            </div>
            <div className="space-y-1">
              <div className="text-matrix-green">complete-task [id]</div>
              <div className="text-matrix-green">delete-task [id]</div>
              <div className="text-matrix-green">list-tasks [--filter=option]</div>
              <div className="text-matrix-green">show-stats</div>
              <div className="text-matrix-green">clear</div>
              <div className="text-matrix-green">help</div>
            </div>
          </div>
          <div className="mt-2 text-cyber-cyan">
            EXAMPLES:
          </div>
          <div className="text-xs text-muted-gray ml-2">
            add-task "Fix bug" --priority=high --category=work --due=2024-08-15
            <br />
            list-tasks --filter=today
          </div>
        </div>
      )}
    </div>
  );
}
