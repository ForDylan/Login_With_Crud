import { Component, output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-google-button',
  imports: [],
  templateUrl: './google-button.html',
  styleUrl: './google-button.css'
})
export class GoogleButton 
{
  onClick = output<void>();
}
