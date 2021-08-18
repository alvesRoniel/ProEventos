import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  frmLogin!: FormGroup;
  model: any = {};

  get f(): any {
    return this.frmLogin.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService

  ) { }

  ngOnInit(): void {
    this.validation();
    this.verificarIsTokenExiste();
  }

  validation(): void {
    this.frmLogin = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  public cssValidator(campoForm: FormControl | AbstractControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  verificarIsTokenExiste(): void {
    if (localStorage.getItem('token') !== null) {
      this.router.navigate(['/dashboard']);
    }
  }

  realizarLogin(): void {
    this.authService.login(this.model).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      },
      (error: any) => {
        this.toastr.warning('Usuário ou senha incorretos.', 'Atenção!');

        console.error(error);
      },
    ).add(() => this.spinner.hide());
  }




}
