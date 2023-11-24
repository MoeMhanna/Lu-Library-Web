import { Component } from '@angular/core';
import { UsersService } from './service/users.service';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'users-modal',
  templateUrl: './users-modal.component.html',
  styleUrl: './users-modal.component.scss'
})
export class UsersModalComponent {
  public num: number;
  public users$ = this.userService.getUsers();
  public fsUserColumns: { title: string, prop: string }[] = [
    {
      title: 'Username',
      prop: 'username'
    },
    {
      title: 'e-mail',
      prop: 'email'
    },
    {
      title: 'Role',
      prop: 'role'
    },
    {
      title: 'created On',
      prop: 'createdOn'
    },
  ];
  protected readonly ColumnMode = ColumnMode;

  constructor(public userService: UsersService) {
    // this.num = 0;
  }
}
