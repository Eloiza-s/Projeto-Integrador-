import { Component } from '@angular/core';
import { UsuarioComponent } from './components/usuario/usuario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UsuarioComponent],
  template: `<app-usuario />`
})
export class AppComponent {}