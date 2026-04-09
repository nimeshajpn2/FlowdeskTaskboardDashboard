export interface RegisterViewModel {
  userName: string;
  email: string;
  password: string;
  role: string ;
}

export interface LoginViewModel {
  userName: string;
  password: string;
}

export interface AuthResponse<T = any> {
  message: string;
  data?: T;
}