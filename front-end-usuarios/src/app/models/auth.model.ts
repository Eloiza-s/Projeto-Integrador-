export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  nome: string;
  perfil: string;
  token: string;
  expiraEm: string;
}
