import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { TaskCardComponent } from '../task-card/task-card';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.html',
  imports: [CommonModule, TaskCardComponent, DragDropModule]
})
export class TaskListComponent {

  constructor(public taskService: TaskService) {}

  getByStatus(status: 'todo' | 'doing' | 'done') {
    return this.taskService.tasks().filter(t => t.status === status);
  }

  drop(event: CdkDragDrop<any>, status: 'todo' | 'doing' | 'done') {
    const task = event.item.data;
    this.taskService.moveTask(task.id, status);
  }

  onEditRequest(task: any) {
    // ainda não implementado (evita erro de compilação)
    console.log('editar:', task);
  }
}