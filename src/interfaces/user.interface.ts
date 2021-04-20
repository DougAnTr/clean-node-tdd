export interface UserInterface {
  id: string;
  password: string;
  email?: string;
}

export type UserType = UserInterface | null;
