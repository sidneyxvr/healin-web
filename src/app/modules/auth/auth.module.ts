import { AuthService } from './services/auth.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData  } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import ptBr from '@angular/common/locales/pt';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgBrazil } from 'ng-brazil';
import { ToastrModule } from 'ngx-toastr';
import { TextMaskModule } from 'angular2-text-mask';

import { LoginComponent } from './login/login.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth.routing';
import { ChooseProfileComponent } from './choose-profile/choose-profile.component';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';
import { DeactivateAccountComponent } from './deactivate-account/deactivate-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ErrorInterceptor } from 'src/app/services/error.handler.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

registerLocaleData(ptBr)

@NgModule({
  declarations: [
    AuthComponent, 
    LoginComponent, 
    RegisterPatientComponent, 
    ForgotPasswordComponent, 
    ResetPasswordComponent, 
    ChooseProfileComponent, 
    RegisterDoctorComponent, 
    DeactivateAccountComponent, 
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgSelectModule,
    TextMaskModule,
    NgBrazil,
    ToastrModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    AuthService,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  exports: [
    DeactivateAccountComponent, 
    ChangePasswordComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AuthModule { }
