import { NgBrazil } from 'ng-brazil';
import { ViaCepService } from './services/via-cep.service';
import { AuthModule } from '../auth/auth.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';
import { TextMaskModule } from 'angular2-text-mask';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ImageCropperModule } from 'ngx-image-cropper';

import { SharedRoutingModule } from './shared.routing';
import { ComponentsModule } from 'src/app/components/components.module';
import { SharedComponent } from './shared.component';
import { ManageProfileComponent } from './manage-profile/manage-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditAddressComponent } from './edit-address/edit-address.component';
import { DoctorService } from './services/doctor.service';
import { PatientService } from './services/patient.service';
import { UserService } from './services/user.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    SharedComponent,
    ManageProfileComponent,
    EditProfileComponent,
    EditAddressComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    SharedRoutingModule,
    NgbModule,
    AuthModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgSelectModule,
    NgBrazil,
    TextMaskModule,
    BsDatepickerModule.forRoot(),
    ImageCropperModule,
  ],
  providers:[
    ViaCepService,
    DoctorService,
    PatientService,
    UserService,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class SharedModule { }
