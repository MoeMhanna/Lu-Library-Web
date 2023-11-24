import { UserRoleEnum } from '../client/enums/user-role.enum';
import { UserModel } from '../client/model/user.model';
import * as moment from 'moment';

export class UserBo {
  id: string;
  username: string;
  email: string;
  role: UserRoleEnum;
  password: string;
  createdOn: string;

  constructor(userModel: UserModel) {
    this.id = userModel.id;
    this.username = userModel.username;
    this.email = userModel.email;
    this.role = userModel.role;
    this.password = userModel.password;
    this.createdOn = moment(userModel.createdOn).format('YYYY / MM / DD');
  }
}
