import { LocalStorageUtils } from './../../../utils/localstorage';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';

import { CustomValidators } from 'ngx-custom-validators';

import { FormBaseComponent } from 'src/app/utils/form-base';
import { AuthService } from './../services/auth.service';
import { Login } from 'src/app/models/auth/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormBaseComponent implements OnInit {
  localStorageUtils: LocalStorageUtils = new LocalStorageUtils();

  errors: any[] = [];
  loginForm: FormGroup;
  login: Login;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private authService: AuthService,
    private toastr: ToastrService) {
    super();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.login = this.loginForm.value;

    this.authService.login(this.login)
      .subscribe(
        (data) => { 
          this.localStorageUtils.saveLocalUser(data);
          this.router.navigate(['/']);
        },
        (fail) => {
          for(const error of fail.error){
            this.toastr.error(error);
          }
          this.loading = false;
        },
      )
  }
}
