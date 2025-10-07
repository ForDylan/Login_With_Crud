import { Component, effect } from '@angular/core';
import { Table } from '../../ui/table/table';
import { RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { TaskService } from '../../data-acces/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [Table,RouterLink],
  templateUrl: './task-list.html',
  styleUrls: ['task-list.css'],
  providers: [TaskService],
})
export default class TaskList 
{
  public tasksService = inject(TaskService);
}
