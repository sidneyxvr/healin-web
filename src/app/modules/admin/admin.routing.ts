import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { ExamTypeListComponent } from './exam-type/list/list.component';
import { AdminComponent } from './admin.component';
import { ExamTypeCreateComponent } from './exam-type/create/create.component';
import { ExamTypeEditComponent } from './exam-type/edit/edit.component';
import { ExamListComponent } from './exam/list/list.component';
import { ExamCreateComponent } from './exam/create/create.component';
import { ExamEditComponent } from './exam/edit/edit.component';
import { SpecialtyEditComponent } from './specialty/edit/edit.component';
import { SpecialtyCreateComponent } from './specialty/create/create.component';
import { SpecialtyListComponent } from './specialty/list/list.component';
import { VaccineListComponent } from './vaccine/list/list.component';
import { VaccineCreateComponent } from './vaccine/create/create.component';
import { VaccineEditComponent } from './vaccine/edit/edit.component';

const routes : Routes = [
    {
        path: '', component: AdminComponent,
        children: [
            { path: 'exam-type/list', component: ExamTypeListComponent },
            { path: 'exam-type/create', component: ExamTypeCreateComponent },
            { path: 'exam-type/edit/:id', component: ExamTypeEditComponent },

            { path: 'exam/list', component: ExamListComponent },
            { path: 'exam/create', component: ExamCreateComponent },
            { path: 'exam/edit/:id', component: ExamEditComponent },

            { path: 'specialty/list', component: SpecialtyListComponent },
            { path: 'specialty/create', component: SpecialtyCreateComponent },
            { path: 'specialty/edit/:id', component: SpecialtyEditComponent },
            
            { path: 'vaccine/list', component: VaccineListComponent },
            { path: 'vaccine/create', component: VaccineCreateComponent },
            { path: 'vaccine/edit/:id', component: VaccineEditComponent },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule{}

