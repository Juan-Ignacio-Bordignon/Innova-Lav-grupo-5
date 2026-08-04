export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  nombre: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  message: string;
  token: string;
};