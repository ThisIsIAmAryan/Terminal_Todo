import { type User, type InsertUser, type Task, type InsertTask, type UpdateTask } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Task operations
  getTasks(): Promise<Task[]>;
  getTask(id: string): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: string, task: UpdateTask): Promise<Task | undefined>;
  deleteTask(id: string): Promise<boolean>;
  getTasksByDate(date: string): Promise<Task[]>;
  getTasksByCategory(category: string): Promise<Task[]>;
  getTasksByPriority(priority: string): Promise<Task[]>;
  completeTask(id: string): Promise<Task | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private tasks: Map<string, Task>;

  constructor() {
    this.users = new Map();
    this.tasks = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getTasks(): Promise<Task[]> {
    return Array.from(this.tasks.values()).sort((a, b) => {
      // Sort by priority (high > medium > low) then by due date
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder];
      const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder];
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      
      return a.dueDate ? -1 : b.dueDate ? 1 : 0;
    });
  }

  async getTask(id: string): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = randomUUID();
    const task: Task = {
      ...insertTask,
      id,
      completed: false,
      createdAt: new Date().toISOString().split('T')[0],
    };
    this.tasks.set(id, task);
    return task;
  }

  async updateTask(id: string, updateTask: UpdateTask): Promise<Task | undefined> {
    const existingTask = this.tasks.get(id);
    if (!existingTask) {
      return undefined;
    }
    
    const updatedTask = { ...existingTask, ...updateTask };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  async deleteTask(id: string): Promise<boolean> {
    return this.tasks.delete(id);
  }

  async getTasksByDate(date: string): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(task => task.dueDate === date);
  }

  async getTasksByCategory(category: string): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(task => task.category === category);
  }

  async getTasksByPriority(priority: string): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(task => task.priority === priority);
  }

  async completeTask(id: string): Promise<Task | undefined> {
    const task = this.tasks.get(id);
    if (!task) {
      return undefined;
    }
    
    const completedTask = { ...task, completed: true };
    this.tasks.set(id, completedTask);
    return completedTask;
  }
}

export const storage = new MemStorage();
