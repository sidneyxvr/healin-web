import { PrescriptionComponent } from './prescription/prescription.component';
import { VaccineCardComponent } from './vaccine-card/vaccine-card.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PatientListComponent } from './patient/list/list.component';
import { DoctorComponent } from './doctor.component';
import { PatientMedicalHistoryListComponent } from './patient-medical-history/list/list.component';

const routes : Routes = [
    { 
        path: '', component: DoctorComponent,
        children: [
            { path: 'patient/list', component: PatientListComponent },
            
            { path: 'patient-medical-history/:patient-id', component: PatientMedicalHistoryListComponent },

            { path: 'vaccine-card/:patient-id', component: VaccineCardComponent },

            { path: 'prescription/:patient-id', component: PrescriptionComponent },
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class DoctorRoutingModule {}