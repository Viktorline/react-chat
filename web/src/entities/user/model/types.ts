export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}