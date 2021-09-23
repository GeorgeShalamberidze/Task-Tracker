import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  text!: string;
  day!: string;
  reminder: boolean = false
  showAddTask!: boolean
  subscription!: Subscription

  @Output() onAddTask: EventEmitter<Task> = new EventEmitter<Task>()

  constructor(private uiService: UiService) { 
    this.subscription = this.uiService.onToggle().subscribe((v) => {
      this.showAddTask = v
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.text) {
      alert("Please add a Task!")
      return
    }

    const newTask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }
    
    this.onAddTask.emit(newTask)

    this.text = '';
    this.day = '';
    this.reminder = false
  }
}
