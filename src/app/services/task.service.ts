import { Injectable, signal } from '@angular/core';

export interface Task {
  id: string;
  title: string;
  due: string;
  level: 'low' | 'medium' | 'high';
  desc?: string;
  status: 'todo' | 'doing' | 'done';
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly STORAGE_KEY = 'app_task_manager_tasks_v1';

  // Usamos um Signal para o estado, iniciando com os dados do LocalStorage
  private tasksSignal = signal<Task[]>(this.loadTasks());

  // Expondo como somente leitura para os componentes
  tasks = this.tasksSignal.asReadonly();

  private loadTasks(): Task[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return this.seedTasks();
    try {
      return JSON.parse(raw);
    } catch {
      return this.seedTasks();
    }
  }

  private saveTasks(tasks: Task[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
    this.tasksSignal.set(tasks);
  }

  private seedTasks(): Task[] {
    const today = new Date().toISOString().slice(0, 10);
    const initialTasks: Task[] = [
      { id: '1', title: 'Ler capítulo 3 de Algoritmos', due: today, level: 'high', desc: 'Priorizar exercícios 3.1-3.5', status: 'todo' },
      { id: '2', title: 'Resolver lista de TS', due: today, level: 'medium', desc: 'Atenção a generics', status: 'doing' },
      { id: '3', title: 'Revisão rápida: HTML/CSS', due: today, level: 'low', desc: '30 minutos', status: 'done' }
    ];
    this.saveTasks(initialTasks);
    return initialTasks;
  }

  // Lógica exata de cores do seu JS original
  getProximityColor(dueISO: string): string {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueISO);
    const diff = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diff < 0) return 'bg-gray-500'; // Passou do prazo
    if (diff <= 1) return 'bg-red-500'; // Hoje ou amanhã
    if (diff <= 3) return 'bg-orange-400';
    if (diff <= 7) return 'bg-yellow-300';
    return 'bg-green-400'; // Prazo folgado
  }

  addTask(data: any) {
    const newTask: Task = { 
      ...data, 
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5), 
      status: 'todo' 
    };
    this.saveTasks([...this.tasksSignal(), newTask]);
  }

  updateTask(updatedTask: Task) {
    const updatedList = this.tasksSignal().map(t => 
      t.id === updatedTask.id ? { ...updatedTask } : t
    );
    this.saveTasks(updatedList);
  }

  moveTask(id: string, newStatus: 'todo' | 'doing' | 'done') {
    const updatedList = this.tasksSignal().map(t => 
      t.id === id ? { ...t, status: newStatus } : t
    );
    this.saveTasks(updatedList);
  }

  deleteTask(id: string) {
    const updatedList = this.tasksSignal().filter(t => t.id !== id);
    this.saveTasks(updatedList);
  }
}