import { useTasks } from "@/hooks/use-tasks";
import { Task } from "@shared/schema";
import { Trash2, Check } from "lucide-react";

export default function TaskList() {
  const { tasks, stats, completeTask, deleteTask, isLoading } = useTasks();

  const handleComplete = async (taskId: string) => {
    try {
      await completeTask.mutateAsync(taskId);
    } catch (error) {
      console.error("Failed to complete task:", error);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask.mutateAsync(taskId);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-low';
    }
  };

  const getCategoryClass = (category: string) => {
    return `category-${category}`;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 h-full">
        <div className="terminal-border bg-terminal-surface p-4 rounded animate-pulse">
          <div className="h-4 bg-terminal-border rounded mb-2"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-8 bg-terminal-border rounded"></div>
            <div className="h-8 bg-terminal-border rounded"></div>
            <div className="h-8 bg-terminal-border rounded"></div>
          </div>
        </div>
        <div className="terminal-border bg-terminal-surface p-4 rounded flex-1 animate-pulse">
          <div className="h-4 bg-terminal-border rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-20 bg-terminal-border rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Task Stats */}
      <div className="terminal-border bg-terminal-surface p-4 rounded">
        <h2 className="text-cyber-cyan mb-3 text-sm font-bold">╔═══ TASK OVERVIEW ═══╗</h2>
        <div className="grid grid-cols-3 gap-4 text-xs">
          <div className="text-center">
            <div className="text-matrix-green text-lg font-bold">{stats?.pending || 0}</div>
            <div className="text-muted-gray">PENDING</div>
          </div>
          <div className="text-center">
            <div className="text-warning-yellow text-lg font-bold">{stats?.inProgress || 0}</div>
            <div className="text-muted-gray">IN PROGRESS</div>
          </div>
          <div className="text-center">
            <div className="text-cyber-cyan text-lg font-bold">{stats?.completed || 0}</div>
            <div className="text-muted-gray">COMPLETED</div>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="terminal-border bg-terminal-surface p-4 rounded flex-1 overflow-hidden">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-cyber-cyan text-sm font-bold">╔═══ ACTIVE TASKS ═══╗</h2>
          <div className="text-xs text-muted-gray">
            FILTER: <span className="text-matrix-green">ALL</span>
          </div>
        </div>
        
        <div className="space-y-2 overflow-y-auto h-full scrollbar-thin scrollbar-track-terminal-bg scrollbar-thumb-terminal-border">
          {tasks?.filter(task => !task.completed).map((task: Task) => (
            <div 
              key={task.id} 
              className={`task-card ${getPriorityClass(task.priority)} bg-terminal-bg p-3 rounded border border-terminal-border`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="text-matrix-green text-sm font-semibold">
                    [{task.priority.toUpperCase()}] {task.title}
                  </div>
                  {task.description && (
                    <div className="text-xs text-muted-gray mt-1">
                      {task.description}
                    </div>
                  )}
                </div>
                <div className="text-xs text-cyber-cyan ml-2">
                  <span className={getCategoryClass(task.category)}>
                    [{task.category.toUpperCase()}]
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center text-xs">
                <div className="text-muted-gray">
                  {task.dueDate ? `DUE: ${task.dueDate}` : 'NO DUE DATE'}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleComplete(task.id)}
                    className="text-matrix-green hover:text-cyber-cyan p-1"
                    disabled={completeTask.isPending}
                  >
                    <Check size={12} />
                  </button>
                  <button 
                    onClick={() => handleDelete(task.id)}
                    className="text-error-red hover:text-warning-yellow p-1"
                    disabled={deleteTask.isPending}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {tasks?.filter(task => !task.completed).length === 0 && (
            <div className="text-center text-muted-gray text-sm py-8">
              NO ACTIVE TASKS FOUND
              <br />
              <span className="text-xs">Use command terminal to add tasks</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
