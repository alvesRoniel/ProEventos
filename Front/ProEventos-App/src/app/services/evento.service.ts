
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';
import { take } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable(
  // { providedIn: 'root'}
)

export class EventoService {
  // visual 2019
  baseURL = environment.apiURL + 'api/eventos';

  // vscode
  // baseURL = 'https://localhost:5001/api/eventos';

  tokenHeader: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.tokenHeader = new HttpHeaders({ Authorization: `Bearer ${localStorage.getItem('token')}` });
  }

  getEvento(): Observable<Evento[]> {
    return this.httpClient.get<Evento[]>(this.baseURL, { headers: this.tokenHeader })
      .pipe(take(1));
  }

  getEventosByTema(tema: string): Observable<Evento[]> {
    return this.httpClient.get<Evento[]>(`${this.baseURL}/tema/${tema}`, { headers: this.tokenHeader })
      .pipe(take(1));
  }

  getEventoById(id: number): Observable<Evento> {
    return this.httpClient.get<Evento>(`${this.baseURL}/${id}`, { headers: this.tokenHeader })
      .pipe(take(1));
  }

  salvarEvento(evento: Evento): Observable<Evento> {
    return this.httpClient
      .post<Evento>(this.baseURL, evento, { headers: this.tokenHeader })
      .pipe(take(1));
  }

  alterarEvento(evento: Evento): Observable<Evento> {
    return this.httpClient
      .put<Evento>(`${this.baseURL}/${evento.id}`, evento, { headers: this.tokenHeader })
      .pipe(take(1));
  }

  deletarEvento(id: number): Observable<any> {
    return this.httpClient.delete<string>(`${this.baseURL}/${id}`, { headers: this.tokenHeader })
      .pipe(take(1));
  }

  postUpload(eventoId: number, file: File): Observable<Evento> {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.httpClient
      .post<Evento>(`${this.baseURL}/upload-image/${eventoId}`, formData, { headers: this.tokenHeader })
      .pipe(take(1));
  }
}
