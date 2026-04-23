import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from './services/task.service';
import { TaskFormComponent } from './components/task-form/task-form';
import { TaskListComponent } from './components/task-list/task-list';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [CommonModule, FormsModule, TaskFormComponent, TaskListComponent]
})
export class AppComponent {
  isModalOpen = signal(false);
  
  taskBeingEdited = signal<Task | null>(null);

  constructor(public taskService: TaskService) {}

  
  openModal() {
    this.taskBeingEdited.set(null);
    this.isModalOpen.set(true);
  }

  
  openEditModal(task: Task) {
    this.taskBeingEdited.set(task);
    this.isModalOpen.set(true);
  }

  
  closeModal() {
    this.isModalOpen.set(false);
    this.taskBeingEdited.set(null);
  }

 
  handleSave(taskData: any) {
    const currentTask = this.taskBeingEdited();

    if (currentTask) {
      
      this.taskService.updateTask({
        ...currentTask,
        ...taskData
      });
    } else {
      
      this.taskService.addTask(taskData);
    }

    this.closeModal();
  }

  addTaskFromForm(task: any) {
  this.taskService.addTask({
    ...task,
    id: crypto.randomUUID(),
    status: 'todo'
  });
}
}
