export class RegisterDto {
  username: string;
  email: string;
  password: string;

  constructor(registerFormValue: any) {
    this.username = registerFormValue.username;
    this.email = registerFormValue.email;
    this.password = registerFormValue.password;
  }
}
