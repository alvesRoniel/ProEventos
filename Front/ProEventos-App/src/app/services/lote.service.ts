import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Lote } from '@app/models/Lote';
import { environment } from '@environments/environment';


@Injectable(
  // {providedIn: 'root'}
)
export class LoteService {

  // visual 2019
  baseURL = environment.apiURL + 'api/lotes';

  // vscode
  // baseURL = 'https://localhost:5001/api/eventos';


  constructor(private httpClient: HttpClient) {
  }

  getLotesByEventoId(eventoId: number): Observable<Lote[]> {
    return this.httpClient
      .get<Lote[]>(`${this.baseURL}/${eventoId}`)
      .pipe(take(1));
  }

  saveLote(eventoId: number, lotes: Lote[]): Observable<Lote[]> {
    return this.httpClient
      .put<Lote[]>(`${this.baseURL}/${eventoId}`, lotes)
      .pipe(take(1));
  }

  deletarLote(eventoId: number, loteId: number): Observable<any> {
    return this.httpClient
      .delete<string>(`${this.baseURL}/${eventoId}/${loteId}`)
      .pipe(take(1));
  }
}
