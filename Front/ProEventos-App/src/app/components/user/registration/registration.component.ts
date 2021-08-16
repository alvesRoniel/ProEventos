import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorField } from '@app/helpers/ValidatorField';
import { User } from '@app/models/User';
import { AuthService } from '@app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  frmRegistration!: FormGroup;
  user: User;

  get f(): any {
    return this.frmRegistration.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.validation();

  }

  validation(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmeSenha')
    };

    this.frmRegistration = this.formBuilder.group({
      primeiroNome: ['', Validators.required],
      ultimoNome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmeSenha: ['', Validators.required],
      fullName: [''],
    },
      formOptions
    );
  }

  cadastrarUsuario(): void {
    if (this.frmRegistration.valid) {

      this.frmRegistration.get('fullName').setValue(this.frmRegistration.get('primeiroNome').value + " " +
        this.frmRegistration.get('ultimoNome').value);

      this.user = Object.assign(
        this.frmRegistration.value,
      );

      this.authService.register(this.user).subscribe(
        (USUARIO_RETORNO: User) => {
          console.log(USUARIO_RETORNO);
          this.router.navigate([`/user/login`]);
          this.toastr.success('Usuário salvo com sucesso!', 'Sucesso');
        },
        (error: any) => {
          const erro = error.error;
          erro.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.warning('Cadastro Duplicado.', 'Atenção');
                break;
              default:
                this.toastr.error(`Erro ao cadastrar o Usuário. Erro: ${element.code}`, 'Error');
                break;
            }
          });
          console.error(error);
        },

      ).add(() => this.spinner.hide());
    }

  }

}
