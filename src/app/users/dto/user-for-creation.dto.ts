import { UserRoleEnum } from '../enums/user-role.enum';

export class UserForCreationDto {
  username: string;
  email: string;
  password: string;
  role: UserRoleEnum;

  constructor(userFormValue: any) {
    this.username = userFormValue.username;
    this.email = userFormValue.email;
    this.password = userFormValue.password;
    this.role = userFormValue.role;
  }

  toJSON() {
    return this;
  }
}
