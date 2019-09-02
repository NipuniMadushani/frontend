export class SignUpInfo {
  name: string;
  username: string;
  email: string;
  role: string[];
  password: string;
  contactNumber: string;

  constructor(name: string, username: string, email: string, password: string, contactNumber: string) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.contactNumber = contactNumber;
    this.role = ['user'];
  }
}
