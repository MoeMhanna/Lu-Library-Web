import { Component, Input } from '@angular/core';
import { ActionButtonInterface } from './interface/action-button.interface';

@Component({
  selector: 'action-button',
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.scss'
})
export class ActionButtonComponent {
@Input()  public actionButton: ActionButtonInterface;
}
