import { SpecialtyService } from './services/specialty.service';
import { ExamTypeEditComponent } from './exam-type/edit/edit.component';
import { ExamTypeCreateComponent } from './exam-type/create/create.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin.component';
import { ExamTypeListComponent } from './exam-type/list/list.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ExamCreateComponent } from './exam/create/create.component';
import { ExamEditComponent } from './exam/edit/edit.component';
import { ExamListComponent } from './exam/list/list.component';
import { ExamTypeService } from './services/exam-type.service';
import { ExamService } from './services/exam.service';
import { SpecialtyListComponent } from './specialty/list/list.component';
import { SpecialtyEditComponent } from './specialty/edit/edit.component';
import { SpecialtyCreateComponent } from './specialty/create/create.component';
import { VaccineListComponent } from './vaccine/list/list.component';
import { VaccineCreateComponent } from './vaccine/create/create.component';
import { VaccineEditComponent } from './vaccine/edit/edit.component';
import { VaccineService } from './services/vaccine.service';

@NgModule({
    declarations: [
        AdminComponent,
        ExamTypeListComponent,
        ExamTypeCreateComponent,
        ExamTypeEditComponent,
        ExamCreateComponent,
        ExamEditComponent,
        ExamListComponent,
        SpecialtyCreateComponent,
        SpecialtyEditComponent,
        SpecialtyListComponent,
        VaccineListComponent,
        VaccineCreateComponent,
        VaccineEditComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        AdminRoutingModule,
        NgSelectModule,
        NgbModule,
    ],
    providers: [
        SpecialtyService,
        ExamTypeService,
        VaccineService,
        ExamService,
    ]
})

export class AdminModule {}