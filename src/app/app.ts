import { Component, signal } from '@angular/core';
import { TaskService, Task } from './services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskCardComponent } from './components/task-card/task-card';
import { TaskFormComponent } from './components/task-form/task-form';
import { TaskListComponent } from './components/task-list/task-list';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [CommonModule, FormsModule, TaskCardComponent, TaskFormComponent, TaskListComponent]
})
export class AppComponent {

  isModalOpen = signal(false);

  newTask: Partial<Task> = {
    title: '',
    due: '',
    level: 'low',
    desc: ''
  };

  constructor(public taskService: TaskService) {}

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  addTask() {
    if (!this.newTask.title || !this.newTask.due) return;

    const task: Task = {
      id: Date.now().toString(),
      title: this.newTask.title!,
      due: this.newTask.due!,
      level: this.newTask.level as any,
      desc: this.newTask.desc || '',
      status: 'todo'
    };

    this.taskService.addTask(task);

    // reset
    this.newTask = { title: '', due: '', level: 'low', desc: '' };
    this.closeModal();
  }

  deleteTask(id: string) {
    this.taskService.deleteTask(id);
  }

  addTaskFromForm(data: any) {
  const task = {
    id: Date.now().toString(),
    ...data,
    status: 'todo'
  };

  this.taskService.addTask(task);
  this.closeModal();
}
}