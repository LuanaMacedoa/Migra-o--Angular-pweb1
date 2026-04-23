import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-task-form',
  standalone: true,
  templateUrl: './task-form.html',
  imports: [CommonModule, FormsModule]
})
export class TaskFormComponent {
 @Output() save = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  isEditing = false;


  task = {
    title: '',
    due: '',
    level: 'low',
    desc: ''
  };

  submit() {
    if (!this.task.title || !this.task.due) return;

    this.save.emit(this.task);

    this.task = {
      title: '',
      due: '',
      level: 'low',
      desc: ''
    };
  }

  cancel() {
    this.close.emit();
  }
}