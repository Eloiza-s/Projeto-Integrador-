export interface Usuario {
  id: number;
  nome: string;
  email: string;
  ativo: 'S' | 'N';
  perfil: string;
  senha?: string;
}

export interface UsuarioRequest {
  nome: string;
  email: string;
  ativo: 'S' | 'N';
  perfil: string;
  senha?: string;
}