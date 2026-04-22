import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { TaskCardComponent } from '../task-card/task-card';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.html',
  imports: [CommonModule, TaskCardComponent]
})
export class TaskListComponent {

  constructor(public taskService: TaskService) {}

  getByStatus(status: 'todo' | 'doing' | 'done') {
    return this.taskService.tasks().filter(t => t.status === status);
  }
}