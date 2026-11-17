import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/auth.model';

export interface UsuarioSessao {
  nome: string;
  email: string;
  perfil: string;
  expiraEm: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly authenticated = signal(this.hasStoredSession());

  private readonly apiUrl = 'http://localhost:5151/api/auth/login';

  constructor(private readonly http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, credentials).pipe(
      tap((response) => {
        const dadosUsuario: UsuarioSessao = {
          nome: response.nome,
          email: response.email,
          perfil: response.perfil,
          expiraEm: response.expiraEm
        };

        localStorage.setItem('auth-token', response.token);
        localStorage.setItem('auth-user', JSON.stringify(dadosUsuario));
        this.authenticated.set(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
    this.authenticated.set(false);
  }

  getCurrentUser(): UsuarioSessao | null {
    const user = localStorage.getItem('auth-user');
    if (!user) {
      return null;
    }

    try {
      return JSON.parse(user) as UsuarioSessao;
    } catch {
      return null;
    }
  }

  getUserName(): string {
    return this.getCurrentUser()?.nome ?? 'Usuário';
  }

  getUserProfile(): string {
    return this.getCurrentUser()?.perfil ?? 'Operador';
  }

  isAuthenticated(): boolean {
    return this.hasStoredSession();
  }

  isAdmin(): boolean {
    return this.getCurrentUser()?.perfil === 'Administrador';
  }

  private hasStoredSession(): boolean {
    const token = localStorage.getItem('auth-token');
    const user = this.getCurrentUser();
    if (!token || !user) {
      return false;
    }

    if (!user.expiraEm) {
      return true;
    }

    return new Date(user.expiraEm).getTime() > Date.now();
  }
}

