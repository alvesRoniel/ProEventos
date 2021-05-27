import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { EventoService } from '@app/services/evento.service';
import { Evento } from '@app/models/Evento';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss'],
})
export class EventoDetalheComponent implements OnInit {
  public frmEventoDetalhe!: FormGroup;
  evento = {} as Evento;
  // evento: Evento[] = [];

  get f(): any {
    return this.frmEventoDetalhe.controls;
  }

  get ngConfig(): any {
    return {
      isAnimated: true,
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY HH:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false
    };
  }

  constructor(
    private formBuilder: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.localeService.use('pt-br');
  }



  ngOnInit(): void {
    this.validation();
    this.carregarEvento();
  }

  carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');

    if (eventoIdParam !== null) {
      this.spinner.show();
      this.eventoService.getEventoById(+eventoIdParam).subscribe(
        (evento: Evento) => {
          this.evento = { ...evento };
          this.frmEventoDetalhe.patchValue(this.evento);
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro a tentar carregar o evento.', 'Erro!');
          console.error(error);
        },
        () => this.spinner.hide(),
      );
    }
  }

  validation(): void {
    this.frmEventoDetalhe = this.formBuilder.group({
      tema: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      local: ['', Validators.required],
      dataHoraEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(1000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: ['', Validators.required],
    });
  }

  resetForm(): void {
    this.frmEventoDetalhe.reset();
  }

  cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm?.errors && campoForm?.touched };
  }
}
