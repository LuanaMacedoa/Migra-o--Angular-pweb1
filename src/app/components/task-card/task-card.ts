import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../services/task.service';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.html'
})
export class TaskCardComponent {

  @Input() task!: Task;
 
  @Output() remove = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Task>();

  onDeleteClick() {
    this.remove.emit(this.task.id);
  }

  onEditClick() {
    this.edit.emit(this.task);
  }
}