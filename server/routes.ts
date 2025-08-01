import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTaskSchema, updateTaskSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all tasks
  app.get("/api/tasks", async (req, res) => {
    try {
      const tasks = await storage.getTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  });

  // Get tasks by filter
  app.get("/api/tasks/filter", async (req, res) => {
    try {
      const { category, priority, date } = req.query;
      
      let tasks = await storage.getTasks();
      
      if (category) {
        tasks = tasks.filter(task => task.category === category);
      }
      
      if (priority) {
        tasks = tasks.filter(task => task.priority === priority);
      }
      
      if (date) {
        tasks = tasks.filter(task => task.dueDate === date);
      }
      
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Failed to filter tasks" });
    }
  });

  // Get today's tasks
  app.get("/api/tasks/today", async (req, res) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const tasks = await storage.getTasksByDate(today);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch today's tasks" });
    }
  });

  // Create task
  app.post("/api/tasks", async (req, res) => {
    try {
      const validatedData = insertTaskSchema.parse(req.body);
      const task = await storage.createTask(validatedData);
      res.status(201).json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid task data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create task" });
      }
    }
  });

  // Update task
  app.patch("/api/tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = updateTaskSchema.parse(req.body);
      const task = await storage.updateTask(id, validatedData);
      
      if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
      
      res.json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid task data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update task" });
      }
    }
  });

  // Complete task
  app.patch("/api/tasks/:id/complete", async (req, res) => {
    try {
      const { id } = req.params;
      const task = await storage.completeTask(id);
      
      if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
      
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: "Failed to complete task" });
    }
  });

  // Delete task
  app.delete("/api/tasks/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteTask(id);
      
      if (!deleted) {
        res.status(404).json({ message: "Task not found" });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete task" });
    }
  });

  // Get task statistics
  app.get("/api/tasks/stats", async (req, res) => {
    try {
      const tasks = await storage.getTasks();
      const stats = {
        pending: tasks.filter(task => !task.completed).length,
        inProgress: tasks.filter(task => !task.completed && task.dueDate === new Date().toISOString().split('T')[0]).length,
        completed: tasks.filter(task => task.completed).length,
        total: tasks.length,
        byCategory: {
          work: tasks.filter(task => task.category === 'work').length,
          personal: tasks.filter(task => task.category === 'personal').length,
          health: tasks.filter(task => task.category === 'health').length,
          learning: tasks.filter(task => task.category === 'learning').length,
        },
        byPriority: {
          high: tasks.filter(task => task.priority === 'high').length,
          medium: tasks.filter(task => task.priority === 'medium').length,
          low: tasks.filter(task => task.priority === 'low').length,
        }
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch task statistics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
