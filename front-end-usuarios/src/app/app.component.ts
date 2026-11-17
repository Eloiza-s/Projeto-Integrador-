import { Component, inject } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent, UsuarioComponent],
  template: `
    @if (authService.isAuthenticated()) {
      <app-usuario />
    } @else {
      <app-login />
    }
  `
})
export class AppComponent {
  protected readonly authService = inject(AuthService);
}