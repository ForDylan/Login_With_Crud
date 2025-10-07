import { Component } from '@angular/core';
import { Task } from '../../data-acces/task';
import { input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './table.html',
  styleUrls: ['./table.css']
})
export class Table 
{
  task = input.required<Task[]>();

}
