import { AuthService } from './../services/auth.service';
import { UpdatePassword } from './../models/update-password';
import { LocalStorageUtils } from './../../../utils/localstorage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  loading: boolean = false;
  localStorageUtils: LocalStorageUtils = new LocalStorageUtils();

  form: FormGroup;
  updatePassword: UpdatePassword;

  constructor(
    private fb: FormBuilder, 
    private toastr: ToastrService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    let _password = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    let _confirmPassword = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(_password)]);

    this.form = this.fb.group({
      email: [{value: this.localStorageUtils.getUser()?.email, disabled: true}],
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]],
      newPassword: _password,
      confirmNewPassword: _confirmPassword
    })
  }

  onSubmit(){
    this.updatePassword = this.form.value as UpdatePassword;

    this.updatePassword.email = this.localStorageUtils.getUser()?.email;

    this.loading = true;

    this.authService.changePassword(this.updatePassword)
      .subscribe(
        () => {
          this.toastr.success('Senha alterada com sucesso');
          this.loading = false;
        },
        fail => {
          for(const error of fail.error){
            this.toastr.error(error);
          }
          this.loading = false;
        }
      )
  }
}