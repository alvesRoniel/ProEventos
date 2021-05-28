import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class EventoService {
  // visual 2019
  baseURL = 'https://localhost:44390/api/eventos';

  // vscode
  //baseURL = 'https://localhost:5001/api/eventos';

  constructor(private httpClient: HttpClient) { }

  getEvento(): Observable<Evento[]> {
    return this.httpClient.get<Evento[]>(this.baseURL).pipe(take(1));
  }

  getEventosByTema(tema: string): Observable<Evento[]> {
    return this.httpClient.get<Evento[]>(`${this.baseURL}/tema/${tema}`);
  }

  getEventoById(id: number): Observable<Evento> {
    return this.httpClient.get<Evento>(`${this.baseURL}/${id}`)
      .pipe(take(1));
  }

  post(evento: Evento): Observable<Evento> {
    return this.httpClient.post<Evento>(this.baseURL, evento);
  }

  alterarEvento(id: number, evento: Evento): Observable<Evento> {
    return this.httpClient.put<Evento>(`${this.baseURL}/${id}`, evento);
  }

  deletarEvento(id: number): Observable<any> {
    return this.httpClient.delete<string>(`${this.baseURL}/${id}`);
  }

}
