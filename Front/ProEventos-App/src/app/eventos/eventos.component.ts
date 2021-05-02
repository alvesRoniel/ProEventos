import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
  public readonly titulo = 'Eventos'
  public eventos: any = [];
  public eventosFiltrados: any = [];

  widthIMG = 150;
  marginIMG = 1;
  showImg = true;
  private _filtroLista = '';

  public get filtroLista(): string {
    return this._filtroLista;
  }

  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.getEventos();
    this.showHideImg();
  }

   getEventos(): void {
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      response => {
        this.eventos = response,
          this.eventosFiltrados = this.eventos
      },
      error => console.log(error)
    )
  }

  showHideImg() {
    this.showImg = !this.showImg;
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();

    return this.eventos.filter(
      (evento: { tema: string; local: string; dataEvento: string }) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.dataEvento.indexOf(filtrarPor) !== -1
    );
  }
}
