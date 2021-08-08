import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { EventoService } from '@app/services/evento.service';
import { Evento } from '@app/models/Evento';
import { Lote } from '@app/models/Lote';
import { LoteService } from '@app/services/lote.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoteAtual } from '@app/models/LoteAtual';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  modalRef: BsModalRef;
  eventoId: number;
  evento = {} as Evento;
  form!: FormGroup;
  estadoSalvar = 'post';
  loteAtual = { id: 0, nome: '', indice: 0 };
  imagemURL = 'assets/img/upload.png';
  file: File;

  get modoEditar(): boolean {
    return this.estadoSalvar === 'put';
  }

  get lotes(): FormArray {
    return this.form.get('lotes') as FormArray;
  }

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY HH:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false
    };
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private activatedRouter: ActivatedRoute,
    private eventoService: EventoService,
    private loteService: LoteService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private router: Router) {
    this.localeService.use('pt-br');
  }

  public carregarEvento(): void {
    this.eventoId = +this.activatedRouter.snapshot.paramMap.get('id');

    if (this.eventoId !== null && this.eventoId !== 0) {
      this.spinner.show();

      this.estadoSalvar = 'put';

      this.eventoService.getEventoById(this.eventoId).subscribe(
        (EVENTO_RETORNO: Evento) => {
          this.evento = { ...EVENTO_RETORNO };
          this.form.patchValue(this.evento);

          //Para carregar a imagem
          if (this.evento.imagemURL !== '') {
            this.imagemURL = environment.apiURL +'resources/images/' + this.evento.imagemURL;
          }

          // Carrega os lotes do evento.
          this.evento.lotes.forEach(lote => {
            this.lotes.push(this.criarLote(lote));
          });
        },
        (error: any) => {
          this.toastr.error('Erro ao carregar o Evento.');
          console.error(error);
        },
      ).add(() => this.spinner.hide());
    }
  }

  ngOnInit(): void {
    this.carregarEvento();
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imagemURL: [''],
      lotes: this.fb.array([]),
    });
  }

  public resetForm(): void {
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  public salvarEvento(): void {
    this.spinner.show();
    if (this.form.valid) {

      this.evento = (this.estadoSalvar === 'post')
        ? { ...this.form.value }
        : { id: this.evento.id, ...this.form.value };

      if (this.estadoSalvar === 'post') {

        this.evento = { ...this.form.value };

        this.eventoService.salvarEvento(this.evento).subscribe(
          (EVENTO_RETORNO: Evento) => {
            this.toastr.success('Evento salvo com sucesso!', 'Sucesso');
            this.router.navigate([`eventos/detalhe/${EVENTO_RETORNO.id}`]);
          },
          (error: any) => {
            console.log(error);
            this.spinner.hide();
            this.toastr.error('Erro ao salvar o evento', 'Erro');
          }
        );
      }
      else {
        this.evento = { id: this.evento.id, ...this.form.value };

        this.eventoService.alterarEvento(this.evento).subscribe(
          () => this.toastr.success('Evento salvo com Sucesso!', 'Sucesso'),
          (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Erro ao salvar o evento', 'Erro');
          },
          () => this.spinner.hide()
        );
      }
    }
  }

  adicionarLote(): void {
    this.lotes.push(this.criarLote({ id: 0 } as Lote));
  }

  criarLote(lote: Lote): FormGroup {
    return this.fb.group({
      id: [lote.id],
      nome: [lote.nome, Validators.required],
      quantidade: [lote.quantidade, Validators.required],
      preco: [lote.preco, Validators.required],
      dataInicio: [lote.dataInicio],
      dataFim: [lote.dataFim]
    });
  }

  mudarValorData(value: Date, indice: number, campo: string): void {
    this.lotes.value[indice][campo] = value;
  }

  retornaTituloLote(tituloLote: string): string {
    return tituloLote === null || tituloLote === '' ? 'Nome do Lote' : tituloLote;
  }

  public salvarLotes(): void {
    if (this.form.controls.lotes.valid) {
      this.spinner.show();
      this.loteService.saveLote(this.eventoId, this.form.value.lotes).subscribe(
        () => {
          this.toastr.success('Lotes salvos com sucesso!', 'Sucesso');
          // this.lotes.reset();
        },
        (error: any) => {
          this.toastr.error('Erro ao tentar salvar os lotes.', 'Erro');
          console.log(error);
        }
      ).add(() => this.spinner.hide());
    }
  }


  removerLote(template: TemplateRef<any>, indice: number): void {

    this.loteAtual.id = this.lotes.get(indice + '.id').value;
    this.loteAtual.nome = this.lotes.get(indice + '.nome').value;
    this.loteAtual.indice = indice;

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirmDeleteLote(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.loteService.deletarLote(this.eventoId, this.loteAtual.id).subscribe(
      () => {
        this.toastr.success('Lote deletado com sucesso!', 'Sucesso');
        this.lotes.removeAt(this.loteAtual.indice);
      },
      (error: any) => {
        this.toastr.error(`Erro ao tentar deletar o Lote: ${this.loteAtual.id}`, 'Erro');
        console.log(error);
      }
    ).add(() => this.spinner.hide());
  }

  declineDeleteLote(): void {
    this.modalRef.hide();
  }

  onFileChange(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => this.imagemURL = event.target.result;

    this.file = ev.target.files;
    reader.readAsDataURL(this.file[0]);

    this.uploadImagem();
  }

  uploadImagem(): void {
    this.spinner.show();

    this.eventoService.postUpload(this.eventoId, this.file).subscribe(
      () => {
        this.carregarEvento();
        this.toastr.success('Imagem atualizada com sucesso', 'Sucesso!');
      },
      (error: any) => {
        this.toastr.error('Erro ao tentar fazer o upload da imagem', 'Erro');
        console.error(error);
      }
    ).add(() => this.spinner.hide());
  }
}
