import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UsersAction } from '../+state/users.actions';
import { UserRoleEnum } from '../enums/user-role.enum';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: 'user-creation.modal.html',
  styleUrls: ['user-creation.modal.scss']
})
export class UserCreationModal {
  public userForm: FormGroup;
  protected readonly UserRoleEnum = UserRoleEnum;

  constructor(private formBuilder: FormBuilder,
              private matDialogRef: MatDialogRef<UserCreationModal>,
              private store: Store) {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [UserRoleEnum.user, Validators.required]
    });
  }

  createUser() {
    this.store.dispatch(UsersAction.createUser({user: this.userForm.value}));
    this.matDialogRef.close();
  }
}
