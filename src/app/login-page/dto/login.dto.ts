export class LoginDto {
  usernameOrEmail: string;
  password: string;

    constructor(loginFormValue: any) {
    this.usernameOrEmail = loginFormValue.email;
    this.password = loginFormValue.password;
  }

  toJSON(){
    return this;
  }
}
