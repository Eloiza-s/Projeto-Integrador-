import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado.model';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5151/api/Estados';

  listar(): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.apiUrl);
  }
}
