import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ChooseProfileComponent } from './choose-profile/choose-profile.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';

const routes: Routes = [
    {
        path: '', component: AuthComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'choose-profile', component: ChooseProfileComponent },
            { path: 'register-patient', component: RegisterPatientComponent },
            { path: 'register-doctor', component: RegisterDoctorComponent },
            { path: 'forgot-password', component: ForgotPasswordComponent },
            { path: 'reset-password', component: ResetPasswordComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
