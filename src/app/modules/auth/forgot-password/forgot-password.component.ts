import { Component, OnInit, ElementRef, ViewChildren } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { FormBaseComponent } from 'src/app/utils/form-base';
import { ForgotPassword } from 'src/app/models/auth/forgot-password';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends FormBaseComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  
  errors: any[] = [];
  forgotPasswordForm: FormGroup;
  forgotPassword: ForgotPassword;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService) {
    super();

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email inválido'
      }
    }

    super.configureMessageValidationsBase(this.validationMessages);
   }

  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngAfterViewInit(): void {
    super.configureValidationFormBase(this.formInputElements, this.forgotPasswordForm);
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }

    this.loading = true;

    this.forgotPassword = this.forgotPasswordForm.value;
    setTimeout(() => {
      this.toastr.success('Verifique seu email', 'Deu bom');
     
      this.loading = false;
    }, 2000);
  }

}
