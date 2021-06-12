import { PatientListComponent } from './patient/list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PatientService } from './services/patient.service';
import { DoctorComponent } from './doctor.component';

import { DoctorRoutingModule } from './doctor.routing';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PatientMedicalHistoryListComponent } from './patient-medical-history/list/list.component';
import { ExamResultService } from './services/exam-result.service';
import { VaccineCardComponent } from './vaccine-card/vaccine-card.component';
import { VaccineDoseService } from './services/vaccine-dose.service';
import { PrescriptionComponent } from './prescription/prescription.component';
import { PrescriptionService } from './services/prescription.service';

@NgModule({
    declarations: [
        DoctorComponent,
        PatientListComponent,
        PatientMedicalHistoryListComponent,
        VaccineCardComponent,
        PrescriptionComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        NgbModule,
        DoctorRoutingModule,
    ],
    providers:[
        PatientService,
        ExamResultService,
        VaccineDoseService,
        PrescriptionService
    ]
})

export class DoctorModule{}