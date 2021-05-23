import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PatientComponent } from './patient.component';
import { ExamResultListComponent } from './exam-result/list/list.component';
import { ExamResultCreateComponent } from './exam-result/create/create.component';
import { ExamResultEditComponent } from './exam-result/edit/edit.component';
import { PrescriptionListComponent } from './prescription/list/list.component';
import { PrescriptionEditComponent } from './prescription/edit/edit.component';
import { PrescriptionCreateComponent } from './prescription/create/create.component';
import { VaccineCardEditComponent } from './vaccine-card/edit/edit.component';
import { VaccineCardCreateComponent } from './vaccine-card/create/create.component';
import { VaccineCardListComponent } from './vaccine-card/list/list.component';
import { DoctorListComponent } from './doctor/list/list.component';

const routes : Routes = [
    { 
        path: '', component: PatientComponent,
        children: [
            { path: 'exam-result/list', component: ExamResultListComponent },
            { path: 'exam-result/create', component: ExamResultCreateComponent },
            { path: 'exam-result/edit/:id', component: ExamResultEditComponent },

            { path: 'prescription/list', component: PrescriptionListComponent },
            { path: 'prescription/create', component: PrescriptionCreateComponent },
            { path: 'prescription/edit/:id', component: PrescriptionEditComponent },

            { path: 'vaccine-card/list', component: VaccineCardListComponent },
            { path: 'vaccine-card/create', component: VaccineCardCreateComponent },
            { path: 'vaccine-card/edit/:id', component: VaccineCardEditComponent },

            { path: 'doctor/list', component: DoctorListComponent },
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PatientRoutingModule {}