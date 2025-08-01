import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Task, InsertTask } from "@shared/schema";

export function useTasks() {
  const queryClient = useQueryClient();

  const tasks = useQuery<Task[]>({
    queryKey: ["/api/tasks"],
  });

  const stats = useQuery<{
    pending: number;
    inProgress: number;
    completed: number;
    total: number;
    byCategory: {
      work: number;
      personal: number;
      health: number;
      learning: number;
    };
    byPriority: {
      high: number;
      medium: number;
      low: number;
    };
  }>({
    queryKey: ["/api/tasks/stats"],
  });

  const createTask = useMutation({
    mutationFn: async (taskData: InsertTask) => {
      const response = await apiRequest("POST", "/api/tasks", taskData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      queryClient.invalidateQueries({ queryKey: ["/api/tasks/stats"] });
    },
  });

  const completeTask = useMutation({
    mutationFn: async (taskId: string) => {
      const response = await apiRequest("PATCH", `/api/tasks/${taskId}/complete`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      queryClient.invalidateQueries({ queryKey: ["/api/tasks/stats"] });
    },
  });

  const deleteTask = useMutation({
    mutationFn: async (taskId: string) => {
      await apiRequest("DELETE", `/api/tasks/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      queryClient.invalidateQueries({ queryKey: ["/api/tasks/stats"] });
    },
  });

  const updateTask = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<InsertTask> }) => {
      const response = await apiRequest("PATCH", `/api/tasks/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      queryClient.invalidateQueries({ queryKey: ["/api/tasks/stats"] });
    },
  });

  return {
    tasks: tasks.data,
    stats: stats.data,
    isLoading: tasks.isLoading || stats.isLoading,
    createTask,
    completeTask,
    deleteTask,
    updateTask,
  };
}
