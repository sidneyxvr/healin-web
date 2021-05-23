import { ExamResultService } from './services/exam-result.service';
import { ExamResultCreateComponent } from './exam-result/create/create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentsModule } from './../../components/components.module';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { PatientRoutingModule } from './patient.routing';
import { PatientComponent } from './patient.component';
import { ExamResultListComponent } from './exam-result/list/list.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ExamTypeService } from '../admin/services/exam-type.service';
import { ExamService } from '../admin/services/exam.service';
import { ExamResultEditComponent } from './exam-result/edit/edit.component';
import { PrescriptionListComponent } from './prescription/list/list.component';
import { PrescriptionCreateComponent } from './prescription/create/create.component';
import { PrescriptionEditComponent } from './prescription/edit/edit.component';
import { PrescriptionService } from './services/prescription.service';
import { SpecialtyService } from '../admin/services/specialty.service';
import { VaccineCardListComponent } from './vaccine-card/list/list.component';
import { VaccineCardCreateComponent } from './vaccine-card/create/create.component';
import { VaccineCardEditComponent } from './vaccine-card/edit/edit.component';
import { VaccineDoseService } from './services/vaccine-dose.service';
import { VaccineService } from '../admin/services/vaccine.service';
import { RemoveDoseDirective } from './vaccine-card/directives/remove-dose.directive';
import { DoctorListComponent } from './doctor/list/list.component';
import { DoctorService } from './services/doctor.service';
import { PatientService } from './services/patient.service';

@NgModule({
    declarations: [
        PatientComponent,
        ExamResultListComponent,
        ExamResultCreateComponent,
        ExamResultEditComponent,
        PrescriptionListComponent,
        PrescriptionCreateComponent,
        PrescriptionEditComponent,
        VaccineCardListComponent,
        VaccineCardCreateComponent,
        VaccineCardEditComponent,
        RemoveDoseDirective,
        DoctorListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PatientRoutingModule,
        ComponentsModule,
        NgSelectModule,
        NgxDropzoneModule,
        NgbModule,
        BsDatepickerModule.forRoot(),
    ],
    providers:[
        ExamService,
        DoctorService,
        PatientService,
        VaccineService,
        ExamTypeService,
        SpecialtyService,
        ExamResultService,
        VaccineDoseService,
        PrescriptionService,
    ]
})

export class PatientModule{}