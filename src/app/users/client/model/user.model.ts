import { UserRoleEnum } from '../enums/user-role.enum';

export interface UserModel {
  id: string,
  username: string,
  email: string,
  role: UserRoleEnum,
  password: string,
  createdOn: string
}
