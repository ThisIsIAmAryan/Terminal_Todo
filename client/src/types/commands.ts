export interface ParsedCommand {
  action: string;
  title?: string;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
  category?: 'work' | 'personal' | 'health' | 'learning';
  dueDate?: string;
  taskId?: string;
  filter?: string;
}

export interface CommandResult {
  success: boolean;
  message: string;
  data?: any;
}

export function parseCommand(input: string): ParsedCommand {
  const parts = input.trim().split(' ');
  const action = parts[0];
  
  const result: ParsedCommand = { action };

  switch (action) {
    case 'add-task':
      // Parse title (first quoted string)
      const titleMatch = input.match(/"([^"]+)"/);
      if (titleMatch) {
        result.title = titleMatch[1];
      }

      // Parse options
      const priorityMatch = input.match(/--priority=(\w+)/);
      if (priorityMatch && ['high', 'medium', 'low'].includes(priorityMatch[1])) {
        result.priority = priorityMatch[1] as 'high' | 'medium' | 'low';
      }

      const categoryMatch = input.match(/--category=(\w+)/);
      if (categoryMatch && ['work', 'personal', 'health', 'learning'].includes(categoryMatch[1])) {
        result.category = categoryMatch[1] as 'work' | 'personal' | 'health' | 'learning';
      }

      const dueDateMatch = input.match(/--due=(\d{4}-\d{2}-\d{2})/);
      if (dueDateMatch) {
        result.dueDate = dueDateMatch[1];
      }

      const descriptionMatch = input.match(/--description="([^"]+)"/);
      if (descriptionMatch) {
        result.description = descriptionMatch[1];
      }
      break;

    case 'complete-task':
    case 'delete-task':
      // Get task ID (second argument)
      if (parts[1]) {
        result.taskId = parts[1];
      }
      break;

    case 'list-tasks':
      const filterMatch = input.match(/--filter=(\w+)/);
      if (filterMatch) {
        result.filter = filterMatch[1];
      }
      break;
  }

  return result;
}
