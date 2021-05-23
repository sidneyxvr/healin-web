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

@NgModule({
    declarations: [
        DoctorComponent,
        PatientListComponent,
        PatientMedicalHistoryListComponent,
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
        ExamResultService
    ]
})

export class DoctorModule{}