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
  // Controle do estado do modal (Signal para melhor performance)
  isModalOpen = signal(false);
  
  // Armazena a tarefa que está sendo editada (null se for uma nova tarefa)
  taskBeingEdited = signal<Task | null>(null);

  constructor(public taskService: TaskService) {}

  /**
   * Abre o modal para criar uma nova tarefa
   */
  openModal() {
    this.taskBeingEdited.set(null);
    this.isModalOpen.set(true);
  }

  /**
   * Abre o modal preenchido para edição
   * Chamado pelo evento (editTask) do TaskListComponent
   */
  openEditModal(task: Task) {
    this.taskBeingEdited.set(task);
    this.isModalOpen.set(true);
  }

  /**
   * Fecha o modal e limpa o estado de edição
   */
  closeModal() {
    this.isModalOpen.set(false);
    this.taskBeingEdited.set(null);
  }

  /**
   * Recebe os dados do TaskFormComponent e decide se salva ou atualiza
   */
  handleSave(taskData: any) {
    const currentTask = this.taskBeingEdited();

    if (currentTask) {
      // Se existe uma tarefa sendo editada, atualizamos ela mantendo o ID e Status
      this.taskService.updateTask({
        ...currentTask,
        ...taskData
      });
    } else {
      // Se não, adicionamos como uma nova tarefa
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