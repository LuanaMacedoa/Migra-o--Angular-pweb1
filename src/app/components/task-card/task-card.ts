import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  templateUrl: './task-card.html',
  imports: [CommonModule]
})
export class TaskCardComponent {
  @Input() task!: Task;

  @Output() remove = new EventEmitter<string>();
  @Output() move = new EventEmitter<{ id: string; status: Task['status'] }>();

  delete() {
    this.remove.emit(this.task.id);
  }

  setStatus(status: Task['status']) {
    this.move.emit({ id: this.task.id, status });
  }
  getColor() {
  return this.task.level === 'high'
    ? 'border-red-500'
    : this.task.level === 'medium'
    ? 'border-yellow-400'
    : 'border-green-400';
}
}