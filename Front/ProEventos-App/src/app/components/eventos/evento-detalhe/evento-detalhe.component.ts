import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss'],
})
export class EventoDetalheComponent implements OnInit {
  public frmEventoDetalhe!: FormGroup;

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
    private localeService: BsLocaleService) {
    this.localeService.use('pt-br');
  }

  ngOnInit(): void {
    this.validation();
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
