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

  private seed: Task[] = [
    {
      id: '1',
      title: 'Ler capítulo 3',
      due: '2026-05-01',
      level: 'high',
      desc: 'Exercícios 3.1–3.5',
      status: 'todo'
    },
    {
      id: '2',
      title: 'Lista de TS',
      due: '2026-05-05',
      level: 'medium',
      desc: '',
      status: 'doing'
    }
  ];

  tasks = signal<Task[]>(this.seed);

  addTask(task: Task) {
    this.tasks.update(t => [...t, task]);
  }

  moveTask(id: string, status: Task['status']) {
    this.tasks.update(list =>
      list.map(t => t.id === id ? { ...t, status } : t)
    );
  }

  deleteTask(id: string) {
    this.tasks.update(list => list.filter(t => t.id !== id));
  }
  
}
