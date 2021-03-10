export interface User {
  email: string;
  password: string;
  name: string;
  isLog?: boolean,
  _id?: string
}

export interface RegistrationData {
    email: string;
    password: string;
    'first-name': string;
    'last-name': string;
}
